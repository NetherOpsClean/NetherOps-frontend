import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server as ServerIcon, Activity, HardDrive, Play, Users, Plus, Loader2 } from "lucide-react";
import { CreateServerModal } from "@/components/CreateServerModal";
import { ServerService } from "@/service/ServerService";
import type { ServerResponse } from "@/types/response/ServerResponse"; // <-- IMPORTA EL TIPO REAL

export default function ServersList() {
  const navigate = useNavigate();
  // Usa directamente el ServerResponse en lugar de crear una interfaz duplicada
  const [servers, setServers] = useState<ServerResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServers = async () => {
      setIsLoading(true);
      try {
        // Obtenemos los datos desde el backend
        const data: ServerResponse[] = await ServerService.getServers();
        
        // Lo guardamos directamente en el estado
        setServers(data);
      } catch (error) {
        console.error("Error al obtener los servidores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServers();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online": return <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20">En línea</span>;
      case "offline": return <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full border border-red-500/20">Apagado</span>;
      case "starting": return <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full border border-yellow-500/20">Iniciando...</span>;
      default: return null;
    }
  };

return (
    <div className="flex flex-col h-full w-full p-6 animate-in fade-in duration-300">
      
      {/* HEADER SIEMPRE VISIBLE */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Red de Servidores</h1>
          <p className="text-sm text-muted-foreground mt-1">Servidores vinculados a tu cuenta.</p>
        </div>
        
        {servers.length > 0 && !isLoading && (
          <Button onClick={() => setIsModalOpen(true)} variant="default" className="flex gap-2">
            <Plus className="w-4 h-4" /> Desplegar Nuevo
          </Button>
        )}
      </div>

      {/* ESTADO 1: CARGANDO */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
          <p>Cargando tu infraestructura...</p>
        </div>
      )}

      {/* ESTADO 2: ESTADO VACÍO */}
      {!isLoading && servers.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center border-2 border-dashed border-border rounded-xl bg-muted/10">
          <div className="bg-primary/10 p-5 rounded-full mb-6">
            <ServerIcon className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-foreground">Aún no tienes servidores</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Parece que eres nuevo por aquí. Empieza desplegando tu primer servidor de Minecraft o pide a un amigo que te invite al suyo.
          </p>
          <Button size="lg" onClick={() => setIsModalOpen(true)} className="font-bold tracking-wide text-md px-8 py-6 h-auto">
            <Plus className="w-5 h-5 mr-2" />
            Crear mi primer servidor
          </Button>
        </div>
      )}

      {/* ESTADO 3: MOSTRANDO LOS SERVIDORES */}
      {!isLoading && servers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server) => (
            <Card key={server.id} className="flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl font-semibold">{server.name}</CardTitle>
                      
                      {/* ETIQUETA DINÁMICA DE ROL */}
                      <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider ${
                        server.role === 'OWNER' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-blue-500/20 text-blue-500'
                      }`}>
                        {server.role === 'OWNER' ? 'Dueño' : 'Invitado'}
                      </span>
                    </div>
                    
                    <CardDescription className="flex flex-col gap-1">
                      {/* Usamos server.nodeId para coincidir con el backend */}
                      <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> Nodo: {server.nodeId}</span>
                      {server.role === 'GUEST' && (
                        <span className="flex items-center gap-1 text-blue-400/80">
                          <Users className="w-3.5 h-3.5" /> De: {server.ownerName}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  {getStatusBadge(server.status)}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-3 rounded-md border">
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground flex gap-1.5"><HardDrive className="w-3.5 h-3.5" /> RAM</span>
                    <span className="font-medium">{server.memory}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground flex gap-1.5"><Activity className="w-3.5 h-3.5" /> Puerto</span>
                    <span className="font-mono">{server.port}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t">
                <Button onClick={() => navigate(`/servers/${server.id}`)} className="w-full font-medium" variant={server.status === 'online' ? 'default' : 'secondary'}>
                  Administrar <Play className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <CreateServerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}