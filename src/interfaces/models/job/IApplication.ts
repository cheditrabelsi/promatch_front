export interface IApplication {
  id: number;
  candidate_name: string;
  candidate_email: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED';
  ai_match_score: number;
  applied_at: string;
  cv: string; // URL du CV
  job_id: number;
}