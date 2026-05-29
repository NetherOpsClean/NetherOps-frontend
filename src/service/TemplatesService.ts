import api from "@/lib/axios";
import type { TemplateResponse } from "@/types/response/TemplatesResponse";

export const getTemplates = async (): Promise<TemplateResponse[]> => {
  const response = await api.get<TemplateResponse[]>("/templates");
  return response.data;
};