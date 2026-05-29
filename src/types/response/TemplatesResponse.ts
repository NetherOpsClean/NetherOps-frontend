export interface TemplateResponse {
  id: string;
  alias: string;         // Cambiado de 'name' a 'alias'
  softwareIdentifier: string; // He añadido los campos que vimos en tu estructura real
  startupCommand?: string | null;
  createdAt: string;
}