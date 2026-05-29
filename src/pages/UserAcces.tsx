import { useState, useEffect } from "react";
import { useParams, Link } from "react-router"; // Usa react-router-dom si es la que tienes
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Shield, UserPlus, Users, ArrowLeft, Trash2, Mail, Loader2 } from "lucide-react";
import { ServerService } from "@/service/ServerService";

interface PlayerAccess {
  userId: string;
  email: string;
  role: string;
  createdAt: string;
}

export function UserAccess() {
  const { id } = useParams(); 
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  
  const [players, setPlayers] = useState<PlayerAccess[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlayers = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await ServerService.getServerPlayers(id);
      setPlayers(data.filter((p: PlayerAccess) => p.role !== "OWNER"));
      console.log("Jugadores recibidos del backend:", data); 

      setPlayers(data); 

    } catch (error) {
      console.error("Error al cargar la lista de jugadores:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchPlayers();
  }, [id]);

  const handleInvitePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await ServerService.addPlayerAccess(id, guestEmail);
      setIsInviteOpen(false);
      setGuestEmail("");
      
      fetchPlayers();
    } catch (error: any) {
      console.error("Error al otorgar acceso:", error);
      const mensajeBackend = error.response?.data?.message || "Ocurrió un error al invitar al usuario.";
      alert(mensajeBackend);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 p-6">
      
      {/* HEADER DE NAVEGACIÓN */}
      <div className="flex items-center gap-4 bg-card border border-border p-4 rounded-lg shadow-sm">
        <Link to={`/servers/${id}`}>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-wide">Gestión de Accesos</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            SERVIDOR_ <span className="text-foreground">{id}</span>
          </p>
        </div>
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Jugadores con Acceso
            </CardTitle>
            <CardDescription>
              Los jugadores en esta lista pueden ver el estado del servidor y encenderlo/apagarlo.
            </CardDescription>
          </div>

          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <UserPlus className="w-4 h-4" /> Dar Acceso
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invitar Jugador</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleInvitePlayer} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo del usuario de NetherOps</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="amigo@ejemplo.com" 
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required 
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsInviteOpen(false)}>Cancelar</Button>
                  <Button type="submit">Otorgar Acceso</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Lógica de Renderizado Dinámico */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin mb-2 text-primary" />
              <p className="text-sm">Cargando jugadores...</p>
            </div>
          ) : players.length === 0 ? (
            <div className="text-center p-8 border border-dashed border-border rounded-lg bg-muted/20">
              <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium text-foreground">Ningún jugador extra tiene acceso</p>
              <p className="text-xs text-muted-foreground mt-1">
                Invita a tus amigos para que puedan administrar el servidor cuando no estés.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Iteramos sobre los jugadores */}
              {players.map((player) => (
                <div key={player.userId} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background shadow-sm hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2.5 rounded-full">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{player.email}</p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Agregado el {new Date(player.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Botón para revocar acceso (Puedes conectarlo al endpoint DELETE luego) */}
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}