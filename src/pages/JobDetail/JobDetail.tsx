import React, { useEffect, useState } from 'react';
import Navbar from '../NavBar/Navbar';
import JobListing from './components/JobListing';
import { Link, useParams } from 'react-router-dom';
import { FiBookmark, FiBriefcase, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import axios from 'axios';

const JobDetail: React.FC = () => {
    const [job, setJob] = useState<any>(null); // stocke le job récupéré
  const [loading, setLoading] = useState(true); // état de chargement
   const { id } = useParams<{ id:string }>();
   console.log('iddd',id)
  useEffect(() => {
  
    const fetchJob = async () => {
      try {
      
        const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}/`);
        console.log('jobbb',response)
        setJob(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du job :", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchJob();
  }, [id]);
  return (
    <div>
      <div className="bg-black  text-white">
      {/* Navbar en haut */}
      <div className="px-6 lg:px-24 pt-6">
        <Navbar />
      </div>

      {/* Titre centré */}
      <div className="flex justify-center items-center py-20">
        <h1 className="text-5xl font-bold">Job Detail</h1>
      </div>
    </div>
    <JobListing id={id} />
    </div>
    
  );
};

export default JobDetail;
