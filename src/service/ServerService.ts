import api from "../lib/axios";
import type { CreateServerRequest } from "../types/request/CreateServerRequest";
import type { ServerResponse } from "../types/response/ServerResponse";

export const ServerService = {
  // Conectamos con el @Post() del ServerController de NestJS
  createServer: async (data: CreateServerRequest): Promise<ServerResponse> => {
    try {
      const response = await api.post<ServerResponse>('/servers', data);
      return response.data;
    } catch (error) {
      // Puedes manejar logs adicionales aquí si lo deseas
      throw error; 
    }
  },
};