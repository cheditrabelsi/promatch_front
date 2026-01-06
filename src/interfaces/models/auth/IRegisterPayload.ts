// src/interfaces/models.ts (ou fichier correspondant)
export interface IRegisterPayload {
  email: string;
  password: string;
  is_candidate?: boolean;
  is_recruiter?: boolean;
  company_name?: string;       // ← ajouté (optionnel)
}