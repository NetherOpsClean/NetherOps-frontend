export interface CreateServerRequest{
  name: string;
  ownerId: string;
  nodeId: string;
  templateId: string;
  memoryLimitMb: number;
  diskLimitMb: number;
  configuration: {
    maxPlayers: number;
    gameMode: string;
    difficulty: string;
    pvpEnabled: boolean;
    motd: string;
    cracked: boolean;
  };
}