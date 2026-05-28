import { 
  Server, 
  Terminal, 
  FileText, 
  Users, 
  Cpu, 
  FolderOpen, 
  Settings 
} from "lucide-react";
import { Link, useLocation } from "react-router";

export function AppSidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Server", icon: Server, path: "/servers/demo-server-123" },
    { name: "Console", icon: Terminal, path: "/servers/demo-server-123/console" },
    { name: "Log", icon: FileText, path: "/servers/demo-server-123/log" },
    { name: "Players", icon: Users, path: "/servers/demo-server-123/players" },
    { name: "Software", icon: Cpu, path: "/servers/demo-server-123/software" },
    { name: "Files", icon: FolderOpen, path: "/servers/demo-server-123/files" },
    { name: "Settings", icon: Settings, path: "/servers/demo-server-123/settings" },
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
      <nav className="flex-1 mt-4 flex flex-col gap-1">
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
      </nav>
    </aside>
  );
}