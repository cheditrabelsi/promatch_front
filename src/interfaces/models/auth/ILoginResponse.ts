import { IUserAccount } from "../user-account";


export interface ILoginResponse {
  user: IUserAccount;     // ← plus précis
  tokens: {
    access: string;
    refresh: string;
  };
}