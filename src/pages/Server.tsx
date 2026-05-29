import { useState } from "react";
import { Link, useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Power, Link as LinkIcon, Code, Users, Cpu, Square, Terminal } from "lucide-react";

export function Server() {
  const { id } = useParams(); 
  const [status, setStatus] = useState<"OFFLINE" | "STARTING" | "ONLINE">("OFFLINE");

  const handleToggleServer = () => {
    if (status === "OFFLINE") {
      setStatus("STARTING");
      setTimeout(() => setStatus("ONLINE"), 3500);
    } else if (status === "ONLINE") {
      setStatus("OFFLINE");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 p-6">
      
      {/* HEADER: Nombre del server y Botones */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-muted text-muted-foreground font-bold px-3 py-1 rounded text-sm border border-border">
            {id || "S1"}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-wide">MC_SERVER_01</h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              VERSION_ <span className="text-foreground">1.20.1 Vanilla</span>
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {/* Botón hacia la consola */}
          <Link to={`/servers/${id}/console`}>
            <Button variant="outline" className="font-bold tracking-wider uppercase gap-2">
              <Terminal className="w-4 h-4" /> Consola
            </Button>
          </Link>

          {status === "OFFLINE" && (
            <Button onClick={handleToggleServer} variant="default" className="font-bold tracking-wider uppercase gap-2 bg-green-600 hover:bg-green-700 text-white">
              <Play className="w-4 h-4" /> Start
            </Button>
          )}
          {status === "ONLINE" && (
            <Button onClick={handleToggleServer} variant="destructive" className="font-bold tracking-wider uppercase gap-2">
              <Square className="w-4 h-4" /> Stop
            </Button>
          )}
        </div>
      </div>

      {/* ESTADO PRINCIPAL (EL BOTÓN GIGANTE) */}
      <Card className="bg-card border-border text-center py-12 relative overflow-hidden shadow-sm">
        {status === "ONLINE" && <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />}
        
        <CardContent className="space-y-6 relative z-10">
          <div className="flex justify-center">
            {status === "OFFLINE" && <Power className="w-16 h-16 text-muted-foreground" />}
            {status === "STARTING" && <Power className="w-16 h-16 text-yellow-500 animate-pulse" />}
            {status === "ONLINE" && <Power className="w-16 h-16 text-green-500" />}
          </div>
          <div>
            <h2 className={`text-5xl font-black tracking-widest mb-2 ${
              status === 'OFFLINE' ? 'text-muted-foreground' : 
              status === 'STARTING' ? 'text-yellow-500' : 'text-green-500'
            }`}>
              {status}
            </h2>
            <p className="text-muted-foreground">
              {status === "OFFLINE" && "Server is currently stopped and consuming no resources."}
              {status === "STARTING" && "Provisioning container and allocating memory..."}
              {status === "ONLINE" && "Server is running and accepting player connections."}
            </p>
          </div>
          
          {status === "OFFLINE" ? (
            <Button onClick={handleToggleServer} size="lg" className="w-48 font-bold tracking-widest uppercase text-lg gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white">
              <Play className="w-5 h-5 fill-current" /> Start
            </Button>
          ) : (
            <Button 
              onClick={handleToggleServer} 
              size="lg" 
              variant={status === "STARTING" ? "secondary" : "destructive"}
              disabled={status === "STARTING"}
              className="w-48 font-bold tracking-widest uppercase text-lg gap-2 mt-4"
            >
              {status === "STARTING" ? (
                <span className="animate-pulse">Starting...</span>
              ) : (
                <><Square className="w-5 h-5 fill-current" /> Stop</>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* GRID DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
              <LinkIcon className="w-4 h-4" /> Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center bg-background border border-border p-3 rounded">
              <code className={`font-mono text-sm ${status === 'ONLINE' ? 'text-foreground' : 'text-muted-foreground'}`}>
                {status === "ONLINE" ? "mc.example.com:25565" : "---.---.---.---:-----"}
              </code>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
              <Code className="w-4 h-4" /> Software
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-background border border-border p-2 rounded">
                <Cpu className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">Vanilla</p>
                <p className="text-xs text-muted-foreground">Version 1.20.1</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs tracking-wider">CHANGE</Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
              <Users className="w-4 h-4" /> Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1 mb-2">
              <span className={`text-3xl font-black ${status === 'ONLINE' ? 'text-foreground' : 'text-muted-foreground'}`}>
                {status === "ONLINE" ? "3" : "0"}
              </span>
              <span className="text-muted-foreground font-bold">/ 20</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
              <div className="h-full bg-primary transition-all duration-1000" style={{ width: status === "ONLINE" ? "15%" : "0%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
              <Cpu className="w-4 h-4" /> RAM Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1 mb-2">
              <span className={`text-3xl font-black ${status === 'ONLINE' ? 'text-foreground' : 'text-muted-foreground'}`}>
                {status === "ONLINE" ? "842" : "0"} <span className="text-lg">MB</span>
              </span>
              <span className="text-muted-foreground font-bold">/ 2048 MB</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
              <div className="h-full bg-primary transition-all duration-1000" style={{ width: status === "ONLINE" ? "41%" : "0%" }}></div> 
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}