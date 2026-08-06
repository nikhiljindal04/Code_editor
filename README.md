# Containerized Vite React Project - Troubleshooting & Solutions

## Issue 1: Vite Server Not Reloading (HMR Not Working)

### **Problem / Cause:**
When running a Vite server inside a Docker container with host directories mounted as volumes (via `HostConfig.Binds`), file system events (like file saves) on the host OS (especially Windows/macOS) are not reliably propagated to the Docker container. 
Vite's file watcher (Chokidar) relies on these native OS events to trigger Hot Module Replacement (HMR). Without them, Vite doesn't know when a file is edited, so the page does not reload.

### **Solution:**
You need to configure Vite to use **polling** to watch for file changes, rather than relying on native file system events. 

Update your `vite.config.js` (or `vite.config.ts`) in your React project to include the following configuration:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Expose to all network interfaces
    watch: {
      usePolling: true, // Enable polling for file changes
    }
  }
})
```

---

## Issue 2: Terminal Getting Stuck (Especially during `npm install`)

### **Problem / Cause:**
The terminal gets stuck because of how the Docker command execution stream is being parsed in `handleTerminalCreation.js`.

In `handleTerminalCreation.js`, you are creating the exec instance with `Tty: true`:
```javascript
container.exec({
  Cmd: ["/bin/bash"],
  Tty: true, // <-- TTY is enabled
  // ...
})
```
When `Tty: true` is set, Docker provides a **raw** output stream. However, the custom function `processStreamOutput` is designed to parse a **multiplexed** stream (which Docker only uses when `Tty: false`). It tries to read an 8-byte header `[type, 0, 0, 0, length1, length2, length3, length4]` from every chunk. 

Because the stream is raw text, `processStreamOutput` incorrectly interprets regular terminal output (like ANSI escape codes or the word "npm") as the 8-byte header, resulting in a massive, incorrect `nextDataLength`. The buffer then hangs indefinitely waiting for gigabytes of data that will never arrive.

### **Solution:**
Since you are using `Tty: true`, you must bypass the 8-byte header demultiplexing completely. You can just send the raw stream data directly to the WebSocket.

Update `handleTerminalCreation.js` to remove `processStreamOutput` and pipe the stream directly:

```javascript
export const handleTerminalCreation = (ws, container) => {
  container.exec(
    {
      Cmd: ["/bin/bash"],
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      User: "sandbox",
    },
    (err, exec) => {
      if (err) {
        console.log("error while starting exec", err);
        return;
      }

      exec.start({ hijack: true }, (err, stream) => {
        if (err) {
          console.log("error while starting exec", err);
          return;
        }

        // CORRECTED: Pipe the raw TTY stream directly to the WebSocket
        stream.on("data", (chunk) => {
          ws.send(chunk);
        });

        // Write WebSocket messages directly to the stream
        ws.on("message", (data) => {
          stream.write(data);
        });
      });
    }
  );
};
```
By removing `processStreamOutput` and piping `stream.on("data")` directly to `ws.send()`, the terminal will output smoothly without getting stuck.
