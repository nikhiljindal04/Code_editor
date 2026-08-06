import React, { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { useParams } from 'react-router-dom'
import { AttachAddon } from '@xterm/addon-attach'

function BrowserTerminal() {

    const terminalRef = useRef(null);
    const {projectId: projectIdFromURL} = useParams();

    useEffect(() => {
        const terminal = new Terminal({
            cursorBlink: true,
            theme:{
                background: '#1e1e1e',
                foreground: '#fff',
                cursor: '#fff',
                cursorAccent:"#282a37",
                red: '#f14c4c',
                green: '#23d18b',
                yellow: '#f5f543',
                cyan: '#3b8eea',

            },
            fontFamily: 'Consolas',
            fontSize: 16,
            convertEol : true
        });
        terminal.open(terminalRef.current);
        

        const ws = new WebSocket(`ws://localhost:3000/terminal?projectId=${projectIdFromURL}`);

        ws.onopen = () => {
            const attachAddon = new AttachAddon(ws);
            terminal.loadAddon(attachAddon);
        }


        return () => {
            //socketRef.current.disconnect();
            terminal.dispose();
        }

    }, []);

  return (
    
    <div
    ref={terminalRef}
    style={{
        //setwidth and height
        width : '100%',
        height:'100vh'
    }}
    className='terminal'
    id='terminal-container'

    >
      
    </div>
  )
}

export default BrowserTerminal
