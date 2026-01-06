import { IUserAccount } from "../user-account";

// Reflects API payload: refresh/access tokens plus attached user.
export interface ILoginResponse {
  refresh: string;
  access: string;
  user: IUserAccount;
}
