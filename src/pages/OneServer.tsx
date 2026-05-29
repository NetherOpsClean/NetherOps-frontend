import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Play,
  Power,
  Link as LinkIcon,
  Code,
  Users,
  Cpu,
  Square,
  Terminal,
  Settings,
} from "lucide-react";
import type { ServerResponse } from "@/types/response/ServerResponse";
import { ServerService } from "@/service/ServerService";

export function OneServer() {
  // Capturamos el ID del servidor desde la URL (ej. "srv-01")
  const { id } = useParams();
  const [serverData, setServerData] = useState<ServerResponse | null>(null);
  const [status, setStatus] = useState<"OFFLINE" | "STARTING" | "ONLINE">("OFFLINE");

  // MOCK: Selector de rol para probar la interfaz.
  // En el futuro, esto vendrá del AuthContext o de la API
  const [userRole, setUserRole] = useState<"OWNER" | "GUEST">("OWNER");

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const data = await ServerService.getServerById(id || ""); // Asegúrate de que el ID no sea undefined
        setServerData(data);
        setStatus(data.status.toUpperCase() as "OFFLINE" | "STARTING" | "ONLINE");
      } catch (error) {
        console.error("Error al obtener los datos del servidor:", error);
      }
    };

    if (id) {
      fetchServerData();
    }
  }, [id]);

  const handleToggleServer = () => {
    if (status === "OFFLINE") {
      setStatus("STARTING");
      // Simulamos el tiempo de arranque del contenedor
      setTimeout(() => setStatus("ONLINE"), 3500);
    } else if (status === "ONLINE") {
      setStatus("OFFLINE");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 p-6">
      {/* HERRAMIENTA DE DESARROLLO: Borra este div cuando conectes tu backend */}
      <div className="bg-yellow-500/10 border border-yellow-500/50 p-3 rounded flex items-center justify-between mb-4">
        <span className="text-sm text-yellow-500 font-mono">
          Modo de prueba: Cambia tu rol para ver qué elementos se ocultan
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={userRole === "OWNER" ? "default" : "outline"}
            onClick={() => setUserRole("OWNER")}
          >
            Soy Dueño
          </Button>
          <Button
            size="sm"
            variant={userRole === "GUEST" ? "default" : "outline"}
            onClick={() => setUserRole("GUEST")}
          >
            Soy Invitado
          </Button>
        </div>
      </div>

      {/* HEADER: Nombre del server y Botones de acción */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-muted text-muted-foreground font-bold px-3 py-1 rounded text-sm border border-border">
            {id || "S1"} {/* Muestra el ID de la URL o "S1" por defecto */}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-wide">
              {serverData?.name || "Servidor sin nombre"}
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5 flex items-center gap-2">
              VERSION_{" "}
              <span className="text-foreground">{serverData?.memory || "Sin versión"}</span>
              {/* Etiqueta visual del rol actual */}
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${userRole === "OWNER" ? "bg-primary/20 text-primary" : "bg-blue-500/20 text-blue-500"}`}
              >
                {userRole === "OWNER" ? "Dueño" : "Invitado"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {/* RENDERIZADO CONDICIONAL: El invitado NO ve la consola */}
          {userRole === "OWNER" && (
            <Link to={`/servers/${id}/console`}>
              <Button variant="outline" className="font-bold tracking-wider uppercase gap-2">
                <Terminal className="w-4 h-4" /> Consola
              </Button>
            </Link>
          )}

          {/* RENDERIZADO CONDICIONAL: El invitado NO ve ajustes */}
          {userRole === "OWNER" && (
            <Link to={`/servers/${id}/settings`}>
              <Button variant="outline" className="font-bold tracking-wider uppercase gap-2">
                <Settings className="w-4 h-4" /> Ajustes
              </Button>
            </Link>
          )}

          {/* Botón de arranque/apagado rápido: ESTE SÍ LO VEN TODOS */}
          {status === "OFFLINE" && (
            <Button
              onClick={handleToggleServer}
              variant="default"
              className="font-bold tracking-wider uppercase gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Play className="w-4 h-4" /> Start
            </Button>
          )}
          {status === "ONLINE" && (
            <Button
              onClick={handleToggleServer}
              variant="destructive"
              className="font-bold tracking-wider uppercase gap-2"
            >
              <Square className="w-4 h-4" /> Stop
            </Button>
          )}
        </div>
      </div>

      {/* ESTADO PRINCIPAL (DINÁMICO) */}
      <Card className="bg-card border-border text-center py-12 relative overflow-hidden shadow-sm">
        {status === "ONLINE" && (
          <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
        )}

        <CardContent className="space-y-6 relative z-10">
          <div className="flex justify-center">
            {status === "OFFLINE" && <Power className="w-16 h-16 text-muted-foreground" />}
            {status === "STARTING" && <Power className="w-16 h-16 text-yellow-500 animate-pulse" />}
            {status === "ONLINE" && <Power className="w-16 h-16 text-green-500" />}
          </div>
          <div>
            <h2
              className={`text-5xl font-black tracking-widest mb-2 ${
                status === "OFFLINE"
                  ? "text-muted-foreground"
                  : status === "STARTING"
                    ? "text-yellow-500"
                    : "text-green-500"
              }`}
            >
              {status}
            </h2>
            <p className="text-muted-foreground">
              {status === "OFFLINE" && "El servidor está detenido y no consume recursos."}
              {status === "STARTING" && "Provisionando contenedor y asignando memoria..."}
              {status === "ONLINE" && "El servidor está en ejecución y aceptando jugadores."}
            </p>
          </div>

          {status === "OFFLINE" ? (
            <Button
              onClick={handleToggleServer}
              size="lg"
              className="w-48 font-bold tracking-widest uppercase text-lg gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
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
                <>
                  <Square className="w-5 h-5 fill-current" /> Stop
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* GRID DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address Card */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
              <LinkIcon className="w-4 h-4" /> Dirección IP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center bg-background border border-border p-3 rounded">
              <code
                className={`font-mono text-sm ${status === "ONLINE" ? "text-foreground" : "text-muted-foreground"}`}
              >
                {status === "ONLINE" ? "mc.ejemplo.com:25565" : "---.---.---.---:-----"}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                {/* Puedes poner un icono de copiar portapapeles aquí */}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Software Card */}
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
            {/* Solo el dueño puede cambiar el software */}
            {userRole === "OWNER" && (
              <Button variant="outline" size="sm" className="text-xs tracking-wider">
                CAMBIAR
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Players Card */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
              <Users className="w-4 h-4" /> Jugadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1 mb-2">
              <span
                className={`text-3xl font-black ${status === "ONLINE" ? "text-foreground" : "text-muted-foreground"}`}
              >
                {status === "ONLINE" ? "3" : "0"}
              </span>
              <span className="text-muted-foreground font-bold">/ 20</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
              <div
                className="h-full bg-primary transition-all duration-1000"
                style={{ width: status === "ONLINE" ? "15%" : "0%" }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* RAM Usage Card */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
              <Cpu className="w-4 h-4" /> Uso de RAM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1 mb-2">
              <span
                className={`text-3xl font-black ${status === "ONLINE" ? "text-foreground" : "text-muted-foreground"}`}
              >
                {status === "ONLINE" ? "842" : "0"} <span className="text-lg">MB</span>
              </span>
              <span className="text-muted-foreground font-bold">/ 2048 MB</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
              <div
                className="h-full bg-primary transition-all duration-1000"
                style={{ width: status === "ONLINE" ? "41%" : "0%" }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
