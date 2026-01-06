export interface IJob {
  id?: number; // Optionnel car absent lors de la création
  title: string;
  location: string;
  salary: string;
  description: string;
  requirements: string;
  category: string;
  job_type: 'FULL_TIME' | 'PART_TIME' | 'FREELANCE' | 'INTERNSHIP';
  created_at?: string; // Date de création venant du back
}