// ILoginResponse.ts
export interface IUserAccount {
  id: number;
  email: string;
  role?: string;          // ajoute les champs que ton back renvoie
 
}