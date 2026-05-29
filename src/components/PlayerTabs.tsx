import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PlayersTabProps {
  serverId: string;
  // Aquí podrías recibir la lista actual de accesos o hacer el fetch internamente
}

export function PlayersTab({ serverId }: PlayersTabProps) {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí llamaremos al ServerService para enviar la petición al backend
    console.log(`Otorgando acceso a ${email} para el servidor ${serverId}`);
    
    // Si es exitoso:
    setIsOpen(false);
    setEmail('');
    // Recargar la lista de jugadores...
  };

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Jugadores Autorizados</CardTitle>
          <CardDescription>Gestiona quién tiene acceso a la consola y control de este servidor.</CardDescription>
        </div>
        
        {/* Modal para agregar jugador */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Invitar Jugador</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Otorgar Acceso al Servidor</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleGrantAccess} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico del usuario</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="jugador@ejemplo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
                <Button type="submit">Otorgar Acceso</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </CardHeader>
      <CardContent>
        {/* Aquí iría el listado de jugadores que ya tienen acceso */}
        <div className="text-sm text-muted-foreground p-4 text-center border rounded-md border-dashed">
          Aún no hay otros jugadores con acceso.
        </div>
      </CardContent>
    </Card>
  );
}