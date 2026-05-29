export interface NodeResponse {
  id: string;
  alias: string; // <-- Cambiamos 'name' por 'alias'
  ipAddress: string;
  memoryCapacityMb: number;
  status: string;
  // Puedes agregar memoryTotalMb, isOnline, etc., dependiendo de qué devuelva tu backend
}