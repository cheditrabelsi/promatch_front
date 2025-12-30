import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';

// Type des données renvoyées par ton API Laravel
type Job = {
  id: number;
  title: string;
  company: string;
  industry: string;
  type: string; // Full time, Part time, etc.
  salary: string;
  location: string;
  created_at?: string;
  // Ajoute d'autres champs si besoin
};

const LIMIT = 10; // Nombre de jobs par page

const JobList: React.FC = () => {
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  // Fonction pour charger les jobs
  const fetchJobs = async (currentOffset: number, isReset = false) => {
    if (!hasMore && !isReset) return;

    try {
      if (isReset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/api/jobs/recent/?limit=${LIMIT}&offset=${currentOffset}`
      );

      const newJobs: Job[] = response.data; // ou response.data.results si paginé ainsi

      if (isReset) {
        setRecentJobs(newJobs);
      } else {
        setRecentJobs((prev) => [...prev, ...newJobs]);
      }

      // Si on a reçu moins que LIMIT → plus rien à charger
      if (newJobs.length < LIMIT) {
        setHasMore(false);
      }

      // Met à jour l'offset pour le prochain chargement
      setOffset(currentOffset + LIMIT);
    } catch (error) {
      console.error('Erreur lors du chargement des jobs :', error);
      // Optionnel : toast notification ici
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Chargement initial
  useEffect(() => {
    fetchJobs(0, true);
  }, []);

  // Chargement infini avec Intersection Observer (optionnel mais recommandé)
  // Tu peux l'ajouter plus tard, ici on garde simple

  return (
    <div className="w-full px-6 md:px-24 py-12">
      {/* Titre + lien */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Recent Jobs Available</h1>
        <a href="/jobs" className="text-[#309689] font-medium hover:underline">
          View All →
        </a>
      </div>

      {/* État de chargement initial */}
      {loading && recentJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading jobs...</p>
        </div>
      )}

      {/* Liste des jobs */}
      <div className="space-y-6">
        {recentJobs.map((job) => (
          <JobCard
            key={job.id} // Très important : utiliser l'ID unique !
            id={job.id}
            title={job.title}
            company={job.company}
            industry={job.industry}
            type={job.type}
            salary={job.salary}
            location={job.location}
          />
        ))}
      </div>

      {/* Chargement de plus de jobs */}
      {loadingMore && (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading more jobs...</p>
        </div>
      )}

      {/* Plus de jobs disponibles */}
      {!hasMore && recentJobs.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          No more jobs to display
        </div>
      )}

      {/* Bouton "Load More" (optionnel si tu veux sans scroll infini) */}
      {hasMore && !loading && (
        <div className="text-center mt-10">
          <button
            onClick={() => fetchJobs(offset)}
            className="px-8 py-3 bg-[#309689] text-white rounded-lg hover:bg-[#267a6e] transition"
          >
            Load More Jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;