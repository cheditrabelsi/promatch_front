// HomePage1.tsx
import React from "react";
import SearchBar from "./components/SearchBar";
import JobList from "./containers/JobList";
import CategoryGrid from "./containers/CategoryGrid";
import TestimonialsSection from "./containers/TestimonialsSection";
import Footer from "../Footer/Footer";
import Navbar from "../NavBar/Navbar";

const HomePage1: React.FC = () => {
    const companies = [
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    },
   {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    },
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    },
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    },
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    },
  ];
  return (
    <div className="overflow-x-hidden">
    <div
      className="relative bg-gray-900 text-white min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('assets/images/home/bgHome.png')",
      }}
    >
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto p-4">
        {/* Navigation */}
        <Navbar></Navbar>

        {/* Hero Section */}
        <div className="text-center mb-12 mt-32">
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-xl">
            Find Your Dream Job Today!
          </h1>
          <p className="text-lg drop-shadow-md mb-12 mt-10">
            Connecting Talent with Opportunity: Your Gateway to Career Success
          </p>

          {/* Search Bar */}
      <SearchBar/>
          {/* Stats Section */}
          <div className="mt-8 flex justify-center flex-wrap gap-6">
            <div className="flex items-center">
              <span className="bg-[#309689] rounded-full p-4 mr-2"><img src="assets/images/home/briefcase.png" alt="briefcase" className="w-12 h-12"/></span> 25,850 Jobs
            </div>
            <div className="flex items-center">
              <span className="bg-[#309689] rounded-full p-4 mr-2"><img src="assets/images/home/users.png" alt="users" className="w-12 h-12"/></span> 10,250 Candidates
            </div>
            <div className="flex items-center">
              <span className="bg-[#309689] rounded-full p-4 mr-2"><img src="assets/images/home/building.png" alt="building" className="w-12 h-12"/></span> 18,400 Companies
            </div>
          </div>
        </div>

        {/* Footer */}
       <footer className="flex justify-around items-center py-12 border-t border-gray-700 flex-wrap gap-8 bg-black/80 backdrop-blur-md text-white">
      {companies.map((company) => (
        <div
          key={company.name}
          className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-300"
        >
          <img src={company.logo} alt={company.name} className="h-10" />
          <span className="text-sm font-semibold">{company.name}</span>
        </div>
      ))}
    </footer>
      </div>
    </div>
    <JobList></JobList>
    <CategoryGrid></CategoryGrid>
    <div className="mb-24"></div>
    <TestimonialsSection></TestimonialsSection>
   
    </div>
  );
};

export default HomePage1;
