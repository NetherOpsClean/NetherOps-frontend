import { Server as ServerIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Definimos que el componente recibe una función como propiedad
interface DashboardEmptyStateProps {
  onOpenCreate: () => void;
}

export function DashboardEmptyState({ onOpenCreate }: DashboardEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center border-2 border-dashed border-border rounded-xl bg-muted/10 animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-primary/10 p-5 rounded-full mb-6">
        <ServerIcon className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-3 text-foreground">
        Aún no tienes servidores
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Parece que eres nuevo por aquí. Empieza desplegando tu primer servidor de Minecraft en nuestra infraestructura o pide a un amigo que te dé acceso al suyo.
      </p>
      <Button 
        size="lg" 
        onClick={onOpenCreate} // <-- Ahora llama a la función para abrir el Modal
        className="font-bold tracking-wide text-md px-8 py-6 h-auto transition-transform hover:scale-105"
      >
        <Plus className="w-5 h-5 mr-2" />
        Crear mi primer servidor
      </Button>
    </div>
  );
}