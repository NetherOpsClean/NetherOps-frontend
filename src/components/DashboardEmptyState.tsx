import { useState } from "react";
import { PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateServerModal } from "./CreateServerModal";

export function DashboardEmptyState() {
  // Estado para controlar cuándo se abre el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] bg-background text-foreground px-4 text-center">
      
      <h1 className="text-5xl font-extrabold tracking-tight mb-4">
        Your Server <br />Awaits
      </h1>
      
      <p className="text-muted-foreground mb-10 max-w-md text-sm md:text-base">
        Deploy your first minecraft server
      </p>

      <div className="relative p-2">
        {/* Esquinas decorativas */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-muted-foreground/50"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-muted-foreground/50"></div>

        {/* El botón ahora tiene un onClick clásico de React */}
        <Button 
          onClick={() => setIsModalOpen(true)}
          size="lg" 
          className="flex items-center gap-3 font-bold tracking-wider text-sm uppercase px-8 py-6 rounded-none transition-all hover:scale-105 cursor-pointer z-10 relative"
        >
          <PlusSquare className="w-5 h-5" />
          Create your server
        </Button>
      </div>
      
      {/* El Modal vive aquí abajo, fuera del botón, escuchando la variable isModalOpen */}
      <CreateServerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}