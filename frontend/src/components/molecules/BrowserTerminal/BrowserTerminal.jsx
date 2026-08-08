import React, { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { useParams } from 'react-router-dom'
import { AttachAddon } from '@xterm/addon-attach'
import { useEditorSocketStore } from '../../../store/editorSocketStore'
import useTerminalSocketStore from '../../../store/terminalSocketStore';
import useFetchPortLogicStore from '../../../store/fetchportLogicStore'

function BrowserTerminal() {

    const terminalRef = useRef(null);
    const {projectId: projectIdFromURL} = useParams();
    const { setTerminalSocket } = useTerminalSocketStore();
    const {setIsTerminalSocketReady} = useFetchPortLogicStore();

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
        setTerminalSocket(ws);

        ws.onopen = () => {
            //attach fitaddon
            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);
            fitAddon.fit();
            const attachAddon = new AttachAddon(ws);
            terminal.loadAddon(attachAddon);
            setIsTerminalSocketReady(true);
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
        height:'80vh',
    }}
    className='terminal'
    id='terminal-container'

    >
      
    </div>
  )
}

export default BrowserTerminal
