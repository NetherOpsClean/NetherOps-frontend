export interface ServerResponse {
  id: string;
  name: string;
  status: "online" | "offline" | "starting";
  role: "OWNER" | "GUEST";
  nodeId: string;
  memory: string;
  port: number;
  ownerName?: string; // Es opcional porque el OWNER principal no necesita este campo
}