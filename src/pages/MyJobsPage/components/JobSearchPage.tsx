import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import JobCard from '@/pages/HomePage1/components/JobCard';
import JobFilters from './JobFilters';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

type Job = {
  id: number;
  title: string;
  company?: string;
  category: string;
  job_type: string;
  salary: string;
  location: string;
  created_at: string;
};

type Filters = {
  search?: string;
  city?: string;
  categories?: string[];
  types?: string[];
  salary_min?: number;
  salary_max?: number;
};

const LIMIT = 10;

const JobSearchPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState('latest');

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchJobs = useCallback(async (page: number) => {
    scrollToTop();
    setLoading(true);
    const offset = (page - 1) * LIMIT;

    try {
      const params = new URLSearchParams({
        limit: LIMIT.toString(),
        offset: offset.toString(),
      });

      if (filters.search) params.append('search', filters.search);
      if (filters.city) params.append('location', filters.city);
      if (filters.categories?.length) params.append('category', filters.categories.join(','));
      if (filters.types?.length) params.append('job_type', filters.types.join(','));
      if (filters.salary_min) params.append('salary_min', filters.salary_min.toString());
      if (filters.salary_max) params.append('salary_max', filters.salary_max.toString());

      const response = await axios.get(`http://127.0.0.1:8000/api/jobs/recent/?${params}`);
      const data: Job[] = response.data;

      setJobs(data);
      setCurrentPage(page);
      console.log("heyyyy",data)

      // Retour en haut après chargement
      scrollToTop();
    } catch (error) {
      console.error('Erreur:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs(1);
  }, [filters]);

  // Détermine si on a une page suivante
  const hasNextPage = jobs.length === LIMIT;
  const hasPrevPage = currentPage > 1;

  // Génère les numéros de pages (max 7 visibles, avec "...")
  const generatePageNumbers = () => {
    const totalPagesEstimate = currentPage + 5; // Estimation généreuse
    const pages: (number | string)[] = [];

    for (let i = 1; i <= Math.max(currentPage + 3, 10); i++) {
      if (i === 1 || i === currentPage || i === currentPage - 1 || i === currentPage + 1 || i > totalPagesEstimate - 3) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <JobFilters onFiltersChange={setFilters} />
        </div>

        <section className="md:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-gray-600">
              Page {currentPage} • {jobs.length} offre{jobs.length > 1 ? 's' : ''} affichée{jobs.length > 1 ? 's' : ''}
            </p>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Trier par</InputLabel>
              <Select value={sortBy} label="Trier par" onChange={(e) => setSortBy(e.target.value as string)}>
                <MenuItem value="latest">Plus récent</MenuItem>
                <MenuItem value="salary">Salaire décroissant</MenuItem>
              </Select>
            </FormControl>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <CircularProgress sx={{ color: '#309689' }} />
              <p className="mt-4 text-gray-600">Chargement des offres...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 text-gray-600">
              <p>Aucune offre ne correspond à vos critères.</p>
              <button onClick={() => setFilters({})} className="mt-4 text-[#309689] underline">
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id} 
                  title={job.title}
                  company={job.company || 'Entreprise anonyme'}
                  industry={job.category}
                  type={job.job_type}
                  salary={job.salary ? `${job.salary} DT` : 'Non communiqué'}
                  location={job.location}
                />
              ))}
            </div>
          )}

          {/* PAGINATION AVEC NUMÉROS */}
         {/* PAGINATION SIMPLE : Précédent - Page X - Suivant */}
{hasPrevPage || hasNextPage ? (
  <div className="flex justify-center items-center gap-6 mt-12">
    {/* Bouton Précédent */}
    <button
      onClick={() => fetchJobs(currentPage - 1)}
      disabled={currentPage === 1}
      className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      Précédent
    </button>

    {/* Numéro de page actuel */}
    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#309689] text-white font-bold text-lg">
      {currentPage}
    </div>

    {/* Bouton Suivant */}
    <button
      onClick={() => fetchJobs(currentPage + 1)}
      disabled={!hasNextPage}
      className="flex items-center gap-2 px-6 py-3 bg-[#309689] text-white rounded-lg font-medium hover:bg-[#267a6e] disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      Suivant
    </button>
  </div>
) : null}
        </section>
      </div>
    </div>
  );
};

export default JobSearchPage;