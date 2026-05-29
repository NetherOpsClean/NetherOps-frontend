import api from "@/lib/axios";
import type { NodeResponse } from "@/types/response/NodeResponse";

export const getNode = async(): Promise<NodeResponse[]>=>{
  const response = await api.get("/nodes");
  return response.data.nodes;
}