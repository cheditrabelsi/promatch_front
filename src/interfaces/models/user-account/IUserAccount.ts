// IUserAccount.ts
export interface IUserAccount {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  phone?: string;
  location?: string;
  is_candidate?: boolean;
  is_recruiter?: boolean;
}
