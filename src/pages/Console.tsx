import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConsoleScreen from '@/components/ConsoleScreen';

export default function Console() {
  // Atrapamos TODOS los parámetros de la URL de forma segura
  const params = useParams();
  
  // Extraemos el ID dinámicamente sin importar cómo se llame en tu router
  const currentId = params.id || params.serverId || Object.values(params)[0];

  // TODO: Cambiar esto por tu usuario real cuando conectes el AuthContext
  const userId = "usuario-temporal-123";

  return (
    <div className="flex flex-col h-full w-full p-6 animate-in fade-in duration-300">
      
      {/* Encabezado */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/servers/${currentId}`}>
            <Button variant="outline" size="icon" className="h-10 w-10 hover:bg-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Consola</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Administrando servidor: <span className="font-mono text-primary/80">{currentId}</span>
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

      {/* Contenedor de la Terminal */}
      <div className="flex-1 min-h-[500px]">
        {currentId ? (
          <ConsoleScreen serverId={currentId as string} userId={userId} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground border border-dashed border-gray-800 rounded-lg bg-black/20">
            Buscando servidor en la red...
          </div>
        )}
      </div>

    </div>
  );
}