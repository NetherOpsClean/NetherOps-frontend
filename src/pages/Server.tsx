import { Power, Link as LinkIcon, Code, Users, Cpu, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Server() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* HEADER: Nombre del server y Botón de arranque rápido */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="bg-muted text-muted-foreground font-bold px-3 py-1 rounded text-sm border border-border">
            S1
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-wide">MC_SERVER_01</h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              VERSION_ <span className="text-foreground">1.20.1 Vanilla</span>
            </p>
          </div>
        </div>
        <Button variant="default" className="font-bold tracking-wider uppercase gap-2">
          <Play className="w-4 h-4" /> Start Server
        </Button>
      </div>

      {/* ESTADO PRINCIPAL (OFFLINE) */}
      <Card className="bg-card border-border text-center py-12">
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Power className="w-16 h-16 text-primary animate-pulse" />
          </div>
          <div>
            <h2 className="text-5xl font-black text-primary tracking-widest mb-2">OFFLINE</h2>
            <p className="text-muted-foreground">Server is currently stopped and consuming no resources.</p>
          </div>
          <Button size="lg" className="w-48 font-bold tracking-widest uppercase text-lg gap-2 mt-4">
            <Play className="w-5 h-5 fill-current" /> Start
          </Button>
        </CardContent>
      </Card>

      {/* GRID DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Address Card */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
              <LinkIcon className="w-4 h-4" /> Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center bg-background border border-border p-3 rounded">
              <code className="text-foreground font-mono text-sm">mc.example.com:25565</code>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Software Card */}
        <Card className="bg-card border-border">
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

        {/* Players Card */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
              <Users className="w-4 h-4" /> Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-black text-foreground">0</span>
              <span className="text-muted-foreground font-bold">/ 20</span>
            </div>
            {/* Barra de progreso visual usando variables */}
            <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
              <div className="h-full bg-primary w-0"></div>
            </div>
          </CardContent>
        </Card>

        {/* RAM Usage Card */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
              <Cpu className="w-4 h-4" /> RAM Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-black text-foreground">0 <span className="text-lg">MB</span></span>
              <span className="text-muted-foreground font-bold">/ 2048 MB</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
              {/* Ejemplo: Si estuviera al 5%, usaríamos style={{ width: '5%' }} */}
              <div className="h-full bg-primary w-[5%]"></div> 
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}