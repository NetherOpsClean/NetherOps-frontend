import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ConsoleScreen() {
  // Estado inicial con algunos logs de ejemplo de Minecraft
  const [logs, setLogs] = useState<string[]>([
    "[10:00:00] [Server thread/INFO]: Starting minecraft server version 1.20.4",
    "[10:00:00] [Server thread/INFO]: Loading properties",
    "[10:00:00] [Server thread/INFO]: Default game type: SURVIVAL",
    "[10:00:00] [Server thread/INFO]: Generating keypair",
    "[10:00:01] [Server thread/INFO]: Starting Minecraft server on *:25565",
    "[10:00:02] [Server thread/INFO]: Preparing level \"world\"",
    "[10:00:03] [Server thread/INFO]: Done (2.531s)! For help, type \"help\""
  ]);
  const [command, setCommand] = useState("");
  
  // Referencia para hacer scroll automático hacia abajo
  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Cada vez que cambien los logs, hacemos scroll hacia el final
  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    // Aquí irá tu lógica para enviar el comando por WebSockets a tu backend NestJS
    // Por ahora, solo lo agregamos a la interfaz visualmente
    setLogs(prev => [...prev, `> ${command}`]);
    setCommand("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-background border rounded-lg overflow-hidden shadow-sm">
      
      {/* Cabecera de la consola */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b">
        <h2 className="text-sm font-semibold tracking-tight">Terminal del Servidor</h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs text-muted-foreground font-medium">Online</span>
        </div>
      </div>

      {/* Área de Logs (Pantalla negra) */}
      <div className="flex-1 overflow-y-auto bg-[#0c0c0c] p-4 font-mono text-sm text-zinc-300">
        {logs.map((log, index) => (
          <div 
            key={index} 
            // Si el log es un comando enviado por el usuario, lo pintamos un poco diferente
            className={`break-all whitespace-pre-wrap mb-1 leading-relaxed ${
              log.startsWith('>') ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            {log}
          </div>
        ))}
        {/* Este div invisible es el objetivo para el auto-scroll */}
        <div ref={logsEndRef} />
      </div>

      {/* Área de Input de comandos */}
      <form onSubmit={handleSendCommand} className="flex gap-3 p-4 bg-muted/30 border-t">
        <Input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Escribe un comando... (ej. /gamemode creative)"
          className="flex-1 font-mono bg-background"
          autoComplete="off"
        />
        <Button type="submit" variant="default" className="font-semibold">
          Ejecutar
        </Button>
      </form>
    </div>
  );
}