import React, { useEffect, useState, useRef } from 'react';
import { ServerService } from '@/service/ServerService';

interface ConsoleProps {
  serverId: string;
  userId: string;
}

export default function ConsoleScreen({ serverId, userId }: ConsoleProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [command, setCommand] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll hacia abajo
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Manejo de la conexión WebSocket
  useEffect(() => {
    const wsUrl = `ws://localhost:3000/console`; 
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({
        event: 'attach',
        data: { serverId, userId }
      }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      
      if (response.type === 'log' || response.type === 'info') {
        setLogs((prev) => [...prev, response.data]);
      } else if (response.type === 'error') {
        setLogs((prev) => [...prev, `[ERROR] ${response.data}\n`]);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      setLogs((prev) => [...prev, '\n[Desconectado del servidor]']);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
      setIsConnected(false);
    };

    // Limpieza a prueba de React Strict Mode
    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
    
  }, [serverId, userId]);

  // Enviar comandos
  const handleSendCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || !isConnected) return;

    const cmdToSend = command;
    setCommand(''); 

    try {
      await ServerService.sendCommand(serverId, cmdToSend);
    } catch (error) {
      console.error("Error enviando comando:", error);
      setLogs(prev => [...prev, `\n[ERROR LOCAL] No se pudo enviar el comando '${cmdToSend}'\n`]);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] w-full bg-[#0c0c0c] rounded-lg border border-gray-800 font-mono text-sm shadow-xl overflow-hidden">
      
      {/* Header interno */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-gray-800 text-gray-300">
        <span className="font-semibold text-xs tracking-wider uppercase">Terminal TTY</span>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`}></div>
          <span className="text-xs text-gray-400">{isConnected ? 'Conectado' : 'Desconectado'}</span>
        </div>
      </div>

      {/* Área de Logs */}
      <div className="flex-1 p-4 overflow-y-auto text-green-400 break-all whitespace-pre-wrap leading-tight selection:bg-green-900 selection:text-white">
        {logs.map((log, index) => (
          <span key={index}>{log}</span>
        ))}
        <div ref={logsEndRef} />
      </div>

      {/* Input de Comandos */}
      <form onSubmit={handleSendCommand} className="flex p-2 bg-[#1a1a1a] border-t border-gray-800 focus-within:bg-[#222222] transition-colors">
        <span className="px-3 py-2 text-gray-500 select-none font-bold">{">"}</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          disabled={!isConnected}
          className="flex-1 bg-transparent text-gray-100 outline-none placeholder-gray-600 disabled:opacity-50"
          placeholder="Escribe un comando..."
          autoComplete="off"
          spellCheck="false"
        />
        <button 
          type="submit" 
          disabled={!isConnected || !command.trim()}
          className="px-4 py-1.5 ml-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold disabled:opacity-30 transition-all cursor-pointer"
        >
          EJECUTAR
        </button>
      </form>
      
    </div>
  );
}