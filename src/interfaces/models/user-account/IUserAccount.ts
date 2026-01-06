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
  is_staff?: boolean;
  company_name?: string;
  company_location?: string;
  website?: string;
}
