import axios from 'axios';
import { IJob } from '../interfaces/models/job/IJob';
import { IApplication } from '../interfaces/models/job/IApplication';

const API_URL = 'http://127.0.0.1:8000/api';

// Helper pour récupérer le token (à adapter selon votre AuthProvider)
const getAuthHeader = () => {
  const token = localStorage.getItem('authTokens') 
    ? JSON.parse(localStorage.getItem('authTokens')!).access 
    : null;
  return { Authorization: `Bearer ${token}` };
};

export const jobService = {
  // Récupérer mes offres
  getMyJobs: async (): Promise<IJob[]> => {
    const response = await axios.get(`${API_URL}/jobs/?mine=true`, { headers: getAuthHeader() });
    return response.data;
  },

  // Créer une offre
  createJob: async (jobData: IJob): Promise<IJob> => {
    const response = await axios.post(`${API_URL}/jobs/`, jobData, { headers: getAuthHeader() });
    return response.data;
  },

  // Supprimer une offre
  deleteJob: async (jobId: number): Promise<void> => {
    await axios.delete(`${API_URL}/jobs/${jobId}/`, { headers: getAuthHeader() });
  },

  // Récupérer les candidats d'une offre
  getJobCandidates: async (jobId: number): Promise<IApplication[]> => {
    const response = await axios.get(`${API_URL}/applications/?job_id=${jobId}`, { headers: getAuthHeader() });
    return response.data;
  },

  // Mettre à jour le statut d'une candidature
  updateApplicationStatus: async (appId: number, status: string): Promise<void> => {
    await axios.patch(`${API_URL}/applications/${appId}/`, { status }, { headers: getAuthHeader() });
  }
};