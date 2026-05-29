import { 
  Server, 
  Terminal, 
  FileText, 
  Users, 
  Cpu, 
  FolderOpen, 
  Settings,
  Network // <-- Importamos este nuevo icono para el Hub
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router"; // Asegúrate de usar react-router-dom
interface SidebarProps {
  servers: any[];
  isLoading: boolean;
}

export function AppSidebar({ servers, isLoading }: SidebarProps) {
  const location = useLocation();
  const { id } = useParams();
  const serverId = id || "demo-server-123";

  // Definición de ítems
  const navItems = [
    { name: "Server", icon: Server, path: `/servers/${serverId}` },
    { name: "Console", icon: Terminal, path: `/servers/${serverId}/console` },
    { name: "Log", icon: FileText, path: `/servers/${serverId}/log` },
    { name: "Players", icon: Users, path: `/servers/${serverId}/players` },
    { name: "Software", icon: Cpu, path: `/servers/${serverId}/software` },
    { name: "Files", icon: FolderOpen, path: `/servers/${serverId}/files` },
    { name: "Settings", icon: Settings, path: `/servers/${serverId}/settings` },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Header del Sidebar */}
      <div className="p-6">
        <h2 className="text-primary font-black text-2xl tracking-tighter italic">
          NETHEROPS
        </h2>
        <p className="text-muted-foreground text-[10px] font-bold tracking-widest mt-1">
          MANAGEMENT CONSOLE
        </p>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 mt-4 flex flex-col gap-1 overflow-y-auto">
        
        {/* Siempre visible: Red de Servidores */}
        <Link
          to="/dashboard"
          className={`flex items-center gap-4 px-6 py-3 text-sm font-semibold transition-colors ${
            location.pathname === "/dashboard" 
              ? "bg-primary/10 text-primary border-l-2 border-primary" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-2 border-transparent"
          }`}
        >
          <Network className="w-5 h-5" />
          Mis Servidores
        </Link>

        {/* Separador */}
        <div className="my-2 border-t border-border/50 mx-4"></div>

        {/* --- LÓGICA DE VISUALIZACIÓN --- */}
        {isLoading ? (
          <div className="px-6 py-3 text-xs text-muted-foreground italic">Cargando...</div>
        ) : servers.length > 0 ? (
          <>
            <div className="px-6 mb-2 mt-2 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
              Administrando: {serverId}
            </div>

            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-4 px-6 py-3 text-sm font-semibold transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary border-l-2 border-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-2 border-transparent"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </>
        ) : (
          /* MENSAJE DE ESTADO VACÍO DENTRO DEL SIDEBAR */
          <div className="px-6 py-4 text-xs text-muted-foreground border-l-2 border-transparent">
            <p className="italic">No tienes servidores activos.</p>
          </div>
        )}
      </nav>
    </aside>
  );
}