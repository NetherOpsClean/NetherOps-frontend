import { useState } from "react";
import { useParams } from "react-router"; // O 'react-router-dom' según tu versión
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Shield, UserPlus, Users } from "lucide-react";
import { ServerService } from "@/service/ServerService";

export function UserAccess() {
  // Obtenemos el ID del servidor desde la URL (ej: /servers/:id/players)
  const { id } = useParams(); 
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");

  const handleInvitePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      // Petición real al backend de NestJS
      await ServerService.addPlayerAccess(id, guestEmail);
      setIsInviteOpen(false);
      setGuestEmail("");
      alert(`¡Acceso otorgado correctamente a: ${guestEmail}!`);
    } catch (error: any) {
      console.error("Error al otorgar acceso:", error);
      const mensajeBackend = error.response?.data?.message || "Ocurrió un error al invitar al usuario.";
      alert(mensajeBackend);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4 space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-wide text-foreground">
              <Shield className="w-5 h-5 text-primary" /> Accesos de Jugadores
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Gestiona quién puede ver, encender o apagar este servidor de Minecraft.
            </CardDescription>
          </div>

          {/* MODAL PARA DAR ACCESO */}
          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                <UserPlus className="w-4 h-4" /> Dar Acceso
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-foreground">Invitar Jugador</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleInvitePlayer} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Correo del usuario de NetherOps</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="amigo@ejemplo.com" 
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="bg-background border-border text-foreground"
                    required 
                  />
                  <p className="text-xs text-muted-foreground">
                    El usuario ya debe estar registrado en la plataforma.
                  </p>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button type="button" variant="outline" onClick={() => setIsInviteOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Otorgar Acceso
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Listado de jugadores autorizados (Empty State por ahora) */}
          <div className="text-center p-12 border border-dashed border-border rounded-lg bg-muted/10">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <h3 className="text-md font-semibold text-foreground">Ningún jugador invitado</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Los amigos que agregues aquí aparecerán en esta lista y compartirán el control del servidor.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}