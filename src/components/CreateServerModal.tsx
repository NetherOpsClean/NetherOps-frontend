import { useEffect, useState } from "react";
import { Server, Cpu, HardDrive, Gamepad2, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router";
import { ServerService } from "@/service/ServerService";
import { type CreateServerRequest } from "@/types/request/CreateServerRequest";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { getNode } from "@/service/NodeService";
import type { NodeResponse } from "@/types/response/NodeResponse";
import type { TemplateResponse } from "@/types/response/TemplatesResponse";
import { getTemplates } from "@/service/TemplatesService";

interface CreateServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateServerModal({ isOpen, onClose }: CreateServerModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [nodes, setNodes] = useState<NodeResponse[]>([]);
  const [isLoadingNodes, setIsLoadingNodes] = useState(false);
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    nodeId: "", // <-- Agrega nodeId al estado inicial
    templateId: "vanilla-1.20.1",
    // ... el resto de tu estado igual
    memoryLimitMb: 2048,
    maxPlayers: 20,
    gameMode: "SURVIVAL",
    difficulty: "NORMAL",
    pvpEnabled: true,
    motd: "A NetherOps Server",
    cracked: false,
  });

  useEffect(() => {
    if (isOpen) {
      // Renombramos la función para que tenga más sentido ya que ahora trae más cosas
      const fetchInitialData = async () => {
        // Puedes usar un solo estado de carga para todo el modal, o mantener los tuyos separados
        setIsLoadingNodes(true); 
        // setIsLoadingTemplates(true); // (Si tienes un estado separado)

        try {
          // Promise.all ejecuta ambas llamadas a tu backend al mismo tiempo
          const [availableNodes, availableTemplates] = await Promise.all([
            getNode(),
            getTemplates()
          ]);

          // Guardamos los resultados en sus respectivos estados
          setNodes(availableNodes);
          setTemplates(availableTemplates); // Asegúrate de tener este estado definido
          
          // Opcional: Seleccionar automáticamente el primer nodo de la lista
          if (availableNodes.length > 0) {
            handleChange("nodeId", availableNodes[0].id);
          }
          
          // Opcional: Seleccionar el primer template también
          // if (availableTemplates.length > 0) {
          //   handleChange("templateId", availableTemplates[0].id);
          // }

        } catch (error) {
          console.error("Error fetching initial data:", error);
          toast.error("Error al cargar los nodos o templates disponibles.");
        } finally {
          setIsLoadingNodes(false);
          // setIsLoadingTemplates(false);
        }
      };

      fetchInitialData();
    }
  }, [isOpen]); 
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
    const createServerDto: CreateServerRequest = {
        name: formData.name,
        ownerId: user?.id || "ID_REAL_DE_TU_USUARIO", 
        nodeId: formData.nodeId, 
        templateId: formData.templateId,
        memoryLimitMb: Number(formData.memoryLimitMb),
        // diskLimitMb: Number(formData.diskLimitMb), <-- LO QUITAMOS
        configuration: {
          maxPlayers: Number(formData.maxPlayers),
          gameMode: formData.gameMode,
          difficulty: formData.difficulty,
          pvpEnabled: formData.pvpEnabled,
          motd: formData.motd,
          cracked: formData.cracked
        }
      };

      const response = await ServerService.createServer(createServerDto);
    
      toast.success("Server provisioned successfully!");
      onClose();
      navigate(`/servers/${response.id}`); 

    /*  // === INICIO DE LA SIMULACIÓN (MOCK) ===
      
      // 1. Simulamos que el backend está pensando durante 1.5 segundos
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 2. Inventamos un ID falso para que React Router te lleve a la página
      const fakeServerId = `demo-server-${Math.floor(Math.random() * 1000)}`;

      // 3. Mostramos el éxito y redirigimos
      toast.success("Server provisioned successfully (Simulated)!");
      onClose();
      navigate(`/servers/${fakeServerId}`); 
      
      // === FIN DE LA SIMULACIÓN ===
      */
    } catch (error: any) {
      console.error("Error creating server:", error);
      const errorMessage = error.response?.data?.message || "Failed to deploy infrastructure.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (<Dialog open={isOpen} onOpenChange={onClose}>
      {/* AQUÍ ESTÁ LA SOLUCIÓN AL TAMAÑO: max-h-[85vh] y overflow-y-auto */}
      <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto bg-background border-border text-foreground">
        
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
            <Server className="w-5 h-5" />
            Deploy New Minecraft Server
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Complete the form below to provision your Minecraft infrastructure.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECCIÓN 1: General */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 border-b border-border pb-2">
              <Settings2 className="w-4 h-4" /> General Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Server Name</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. My Survival World" 
                  className="bg-muted/50 border-border"
                  required 
                />
              </div>

              {/* === SELECT DE NODOS === */}
              <div className="space-y-2">
                <Label>Deployment Node</Label>
                <Select 
                  value={formData.nodeId} 
                  onValueChange={(v) => handleChange("nodeId", v)}
                  disabled={isLoadingNodes || nodes.length === 0}
                >
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue 
                      placeholder={isLoadingNodes ? "Cargando nodos..." : "Selecciona un nodo"} 
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border text-foreground">
                    {nodes.length === 0 && !isLoadingNodes && (
                      <SelectItem value="none" disabled>
                        No hay nodos disponibles
                      </SelectItem>
                    )}
                    {nodes.map((node) => (
                      <SelectItem key={node.id} value={node.id}>
                        {node.alias}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* === SELECT DE TEMPLATES (SOFTWARE) MODIFICADO === */}
              <div className="space-y-2">
                <Label>Software / Template</Label>
               <Select 
                value={formData.templateId} 
                onValueChange={(value) => {
                  console.log("Nuevo valor seleccionado:", value); // Verifica si esto aparece en tu consola
                  handleChange("templateId", value);
                }}
                disabled={isLoadingNodes || templates.length === 0} 
              >
                <SelectTrigger className="bg-muted/50 border-border">
                  <SelectValue placeholder="Select software">
                    {/* Forzamos la búsqueda directamente aquí */}
                    {formData.templateId 
                      ? templates.find((t) => t.id === formData.templateId)?.alias || "Cargando..."
                      : "Select software"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground">
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.alias}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motd">MOTD (Message of the Day)</Label>
              <Input 
                id="motd" 
                value={formData.motd}
                onChange={(e) => handleChange("motd", e.target.value)}
                className="bg-muted/50 border-border"
              />
            </div>
          </div>

          {/* SECCIÓN 2: Gameplay */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 border-b border-border pb-2">
              <Gamepad2 className="w-4 h-4" /> Game Configuration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Game Mode</Label>
                <Select value={formData.gameMode} onValueChange={(v) => handleChange("gameMode", v)}>
                  <SelectTrigger className="bg-muted/50 border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-background border-border text-foreground">
                    <SelectItem value="SURVIVAL">Survival</SelectItem>
                    <SelectItem value="CREATIVE">Creative</SelectItem>
                    <SelectItem value="ADVENTURE">Adventure</SelectItem>
                    <SelectItem value="SPECTATOR">Spectator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={formData.difficulty} onValueChange={(v) => handleChange("difficulty", v)}>
                  <SelectTrigger className="bg-muted/50 border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-background border-border text-foreground">
                    <SelectItem value="PEACEFUL">Peaceful</SelectItem>
                    <SelectItem value="EASY">Easy</SelectItem>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                    <SelectItem value="HARD">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Max Players</Label>
                <Input 
                  type="number" 
                  value={formData.maxPlayers}
                  onChange={(e) => handleChange("maxPlayers", e.target.value)}
                  className="bg-muted/50 border-border"
                  min={1}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center bg-muted/30 p-3 rounded border border-border">
                <div className="space-y-0.5">
                  <Label>Allow PvP</Label>
                  <p className="text-[10px] text-muted-foreground">Players deal damage to each other.</p>
                </div>
                <Switch 
                  checked={formData.pvpEnabled}
                  onCheckedChange={(v) => handleChange("pvpEnabled", v)}
                />
              </div>

              <div className="flex justify-between items-center bg-muted/30 p-3 rounded border border-border">
                <div className="space-y-0.5">
                  <Label>No-Premium (Cracked)</Label>
                  <p className="text-[10px] text-muted-foreground">Allow unofficial Minecraft accounts.</p>
                </div>
                <Switch 
                  checked={formData.cracked}
                  onCheckedChange={(v) => handleChange("cracked", v)}
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 border-b border-border pb-2">
              <Cpu className="w-4 h-4" /> Resource Limits
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Cpu className="w-3 h-3"/> RAM (MB)</Label>
                <Input 
                  type="number" 
                  value={formData.memoryLimitMb}
                  onChange={(e) => handleChange("memoryLimitMb", e.target.value)}
                  className="bg-muted/50 border-border"
                  min={1024}
                />
              </div>
              
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-background pt-4 border-t border-border mt-4">
            <Button 
              type="submit" 
              className="w-full font-bold uppercase transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 animate-spin" /> Provisioning...
                </span>
              ) : (
                "Deploy Infrastructure"
              )}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}