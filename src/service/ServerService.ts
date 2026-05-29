import api from "../lib/axios";
import type { CreateServerRequest } from "../types/request/CreateServerRequest";
import type { ServerResponse } from "../types/response/ServerResponse";

export const ServerService = {
  // Conectamos con el @Post() del ServerController de NestJS
  createServer: async (data: CreateServerRequest): Promise<ServerResponse> => {
    const response = await api.post<ServerResponse>("/servers", data);
    return response.data;
  },

  getServers: async (): Promise<ServerResponse[]> => {
    const response = await api.get<ServerResponse[]>("/servers");
    return response.data;
  },

  getServerById: async (serverId: string): Promise<ServerResponse> => {
    const response = await api.get<ServerResponse>(`/servers/${serverId}`);
    return response.data;
  },

  addPlayerAccess: async (serverId: string, guestEmail: string): Promise<unknown> => {
    const response = await api.post(`/servers/${serverId}/users`, { guestEmail });
    return response.data;
  },

  getServerPlayers: async (serverId: string): Promise<unknown> => {
    const response = await api.get(`/servers/${serverId}/users`);
    return response.data;
  },

  startServer: async (serverId: string): Promise<unknown> => {
    const response = await api.post(`/servers/${serverId}/start`);
    return response.data;
  },

  stopServer: async (serverId: string): Promise<unknown> => {
    const response = await api.post(`/servers/${serverId}/stop`);
    return response.data;
  },

  sendCommand: async (serverId: string, command: string): Promise<any> => {
    try {
      const response = await api.post(`/servers/${serverId}/command`, { command });
      return response.data;
    } catch (error) {
      throw error; 
    }
  }
};
