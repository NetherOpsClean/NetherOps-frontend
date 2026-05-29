import { Outlet } from "react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { useState, useEffect } from "react";
import { ServerService } from "@/service/ServerService";
// Importa tu servicio de obtener servidores aquí

export default function DashboardLayout() {
  const [servers, setServers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aquí haces la llamada a tu API para obtener los servidores
    const fetchServers = async () => {
      try {
        const data = await ServerService.getServers();
        if(data){
          setServers(data);
        }else{
          setServers([]);
        }
        
      } catch (e) {
        setServers([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServers();
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Pasamos la lista de servidores al Sidebar */}
      <AppSidebar servers={servers} isLoading={isLoading} />
      
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}