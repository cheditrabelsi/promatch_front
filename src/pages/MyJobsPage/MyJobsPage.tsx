import React from 'react';
import Navbar from '../NavBar/Navbar';
import JobSearchPage from './components/JobSearchPage';
import TopCompanies from './components/TopCompanies';

const MyJobsPage: React.FC = () => {
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
    <JobSearchPage></JobSearchPage>
    <TopCompanies></TopCompanies>
    </div>
    
  );
};

export default MyJobsPage;
