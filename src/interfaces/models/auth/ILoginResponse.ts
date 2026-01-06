import { IUserAccount } from "../user-account";


export interface ILoginResponse {
  access(access: any): unknown;
  user: IUserAccount;     // ← plus précis
  tokens: {
    access: string;
    refresh: string;
  };
}