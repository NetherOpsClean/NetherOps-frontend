import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-background border-b border-border">
      {/* Logo */}
      <div className="text-primary font-black text-2xl tracking-tighter">NETHEROPS</div>

      {/* Acciones de Usuario */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <Bell className="w-5 h-5" />
          {/* Punto de notificación usando el color destructivo o primary */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>

        {/* Avatar de Usuario */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 hover:text-primary"
        >
          <User className="w-4 h-4" />
        </Button>
      </div>
    </nav>
  );
}
