export interface ServerResponse {
  id: string;
  name: string;
  status: "online" | "offline" | "starting";
  role: "OWNER" | "GUEST";
  nodeId: string;
  memory: string;
  port: number;
  ipAddress?: string;
  ownerName?: string;
}
