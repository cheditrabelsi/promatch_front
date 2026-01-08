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
   const applyUrl = id ? `/upload-resume?jobId=${id}` : "/upload-resume";
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
        <h1 className="text-5xl font-bold">Jobs</h1>
      </div>
    </div>
     <div className="bg-white mx-12 p-6 mb-6">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1 bg-[#3096891A] p-2 rounded-lg">
              <FiClock />
              <span>10 min ago</span>
            </div>
            <FiBookmark className="cursor-pointer hover:text-blue-600" size={20} />
          </div>
    
          {/* Middle section: logo + title/subtitle */}
          <div className="flex items-center gap-4 mb-4">
            
             {/* <img src="assets/images/Logo.png" alt={`logo`} className="w-12 h-12 object-contain rounded" />*/}
           
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{job?.recruiter_email} </h2>
              
            </div>
          </div>
    
          {/* Bottom section: info + apply button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
           <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
  <div className="flex items-center gap-1">
    <FiBriefcase className="text-[#309689]" size={20} />
    {job?.title}
  </div>
  <div className="flex items-center gap-1">
    <FiClock className="text-[#309689]" size={20} />
    Full time
  </div>
  <div className="flex items-center gap-1">
    <FiDollarSign className="text-[#309689]" size={20} />
    {job?.salary}
  </div>
  <div className="flex items-center gap-1">
    <FiMapPin className="text-[#309689]" size={20} />
    {job?.location}
  </div>
</div>
           
      <Link
        to={applyUrl}
        className="bg-[#309689] text-white px-16 py-2 rounded hover:bg-blue-700 transition text-center"
      >
        Apply Job
      </Link>

          </div>
        </div>
    <JobListing id={id} />
    </div>
    
  );
};

export default JobDetail;
