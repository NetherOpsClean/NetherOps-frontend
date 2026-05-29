import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Power, Link as LinkIcon, Code, Users, Cpu, Square } from "lucide-react";
import { ServerService } from "@/service/ServerService";
import { useAuth } from "@/context/AuthContext";
import type { ServerResponse } from "@/types/response/ServerResponse";

export function Server() {
  const { id } = useParams();
  const { activeServer } = useAuth();
  const [status, setStatus] = useState<"OFFLINE" | "STARTING" | "ONLINE">("OFFLINE");
  const [serverData, setServerData] = useState<ServerResponse | null>(null);
  const displayServer = activeServer?.id === id ? activeServer : serverData;
  const serverStatus = displayServer?.status?.toUpperCase() as
    | "OFFLINE"
    | "STARTING"
    | "ONLINE"
    | undefined;
  const effectiveStatus = status === "OFFLINE" ? serverStatus || "OFFLINE" : status;
  console.log("Datos del servidor:", displayServer);

  const handleToggleServer = () => {
    if (status === "OFFLINE") {
      setStatus("STARTING");
      ServerService.startServer(id || ""); // Asegúrate de que el ID no sea undefined
      setTimeout(() => setStatus("ONLINE"), 3500);
    } else if (status === "ONLINE") {
      ServerService.stopServer(id || ""); // Asegúrate de que el ID no sea undefined
      setStatus("OFFLINE");
    }
  };

  useEffect(() => {
    const fetchServerData = async () => {
      if (!id) {
        return;
      }

      try {
        const data = await ServerService.getServerById(id);
        setServerData(data);
      } catch (error) {
        console.error("Error al obtener los datos del servidor:", error);
      }
    };

    if (id && (!activeServer || activeServer.id !== id)) {
      fetchServerData();
    }
  }, [id, activeServer]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 p-6">
      {/* HEADER PRINCIPAL */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-muted text-muted-foreground font-bold px-3 py-1 rounded text-sm border border-border">
            {id || "S1"}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-wide">
              {displayServer?.name || "Servidor sin nombre"}
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              VERSION_ <span className="text-foreground">vanilla 1.20.1</span>
            </p>
          </div>
        </div>
      </div>

      {/* SISTEMA DE PESTAÑAS */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
          <TabsTrigger value="overview">Resumen del Servidor</TabsTrigger>
          <TabsTrigger value="access">Gestión de Accesos</TabsTrigger>
        </TabsList>

        {/* PESTAÑA 1: RESUMEN (Tu código actual) */}
        <TabsContent value="overview" className="space-y-6">
          {/* ESTADO PRINCIPAL (EL BOTÓN GIGANTE) */}
          <Card className="bg-card border-border text-center py-12 relative overflow-hidden shadow-sm">
            {effectiveStatus === "ONLINE" && (
              <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
            )}

            <CardContent className="space-y-6 relative z-10">
              <div className="flex justify-center">
                {effectiveStatus === "OFFLINE" && (
                  <Power className="w-16 h-16 text-muted-foreground" />
                )}
                {effectiveStatus === "STARTING" && (
                  <Power className="w-16 h-16 text-yellow-500 animate-pulse" />
                )}
                {effectiveStatus === "ONLINE" && <Power className="w-16 h-16 text-green-500" />}
              </div>
              <div>
                <h2
                  className={`text-5xl font-black tracking-widest mb-2 ${
                    effectiveStatus === "OFFLINE"
                      ? "text-muted-foreground"
                      : effectiveStatus === "STARTING"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {effectiveStatus}
                </h2>
                <p className="text-muted-foreground">
                  {effectiveStatus === "OFFLINE" &&
                    "Server is currently stopped and consuming no resources."}
                  {effectiveStatus === "STARTING" &&
                    "Provisioning container and allocating memory..."}
                  {effectiveStatus === "ONLINE" &&
                    "Server is running and accepting player connections."}
                </p>
              </div>

              {effectiveStatus === "OFFLINE" ? (
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
                  variant={effectiveStatus === "STARTING" ? "secondary" : "destructive"}
                  disabled={effectiveStatus === "STARTING"}
                  className="w-48 font-bold tracking-widest uppercase text-lg gap-2 mt-4"
                >
                  {effectiveStatus === "STARTING" ? (
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
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 tracking-widest">
                  <LinkIcon className="w-4 h-4" /> Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center bg-background border border-border p-3 rounded">
                  <code
                    className={`font-mono text-sm ${effectiveStatus === "ONLINE" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {effectiveStatus === "ONLINE"
                      ? `${displayServer?.ipAddress}:${displayServer?.port}` ||
                        "mc.example.com:25565"
                      : "---.---.---.---:-----"}
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
                <Button variant="outline" size="sm" className="text-xs tracking-wider">
                  CHANGE
                </Button>
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
                  <span
                    className={`text-3xl font-black ${effectiveStatus === "ONLINE" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {effectiveStatus === "ONLINE" ? "3" : "0"}
                  </span>
                  <span className="text-muted-foreground font-bold">/ 20</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
                  <div
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ width: effectiveStatus === "ONLINE" ? "15%" : "0%" }}
                  ></div>
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
                  <span
                    className={`text-3xl font-black ${effectiveStatus === "ONLINE" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {effectiveStatus === "ONLINE" ? "842" : "0"} <span className="text-lg">MB</span>
                  </span>
                  <span className="text-muted-foreground font-bold">/ 2048 MB</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
                  <div
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ width: effectiveStatus === "ONLINE" ? "41%" : "0%" }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* PESTAÑA 2: GESTIÓN DE ACCESOS (NUEVO) */}
      </Tabs>
    </div>
  );
}
