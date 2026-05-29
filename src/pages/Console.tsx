import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConsoleScreen from '@/components/ConsoleScreen'; // Ajusta la ruta a tu componente

export default function ConsolePage() {
  // Capturamos el ID del servidor actual para saber a dónde regresar
  const { id } = useParams();

  return (
    <div className="flex flex-col h-full w-full p-6 animate-in fade-in duration-300">
      
      {/* Encabezado actualizado con botón de regreso */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Botón para volver al Index del servidor (la vista bonita) */}
          <Link to={`/servers/${id}`}>
            <Button variant="outline" size="icon" className="h-10 w-10 hover:bg-accent">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Consola</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Administra el servidor {id} en tiempo real.
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            En línea
          </div>
        </div>
      </div>

      {/* Contenedor del componente ConsoleScreen */}
      <div className="flex-1 min-h-[500px]">
        <ConsoleScreen />
      </div>

    </div>
  );
}