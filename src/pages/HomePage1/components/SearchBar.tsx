// SearchBar.tsx
import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10 bg-transparent">
      {/* Conteneur principal */}
      <div className="flex items-center bg-white shadow-md w-full rounded-lg max-w-4xl h-20">
        {/* Champ texte */}
        <input
          type="text"
          placeholder="Job Title or Company"
          className="flex-1 px-6 py-6 text-gray-700 focus:outline-none placeholder-gray-500 bg-transparent text-base border-l border-gray-300 rounded-l-lg min-w-0"
        />

        {/* Sélecteur de lieu */}
        <select className="flex-1 px-6 py-6 text-gray-700 focus:outline-none bg-transparent appearance-none text-base border-l border-gray-300 min-w-0">
          <option>Select Location</option>
          <option>New York</option>
          <option>Paris</option>
          <option>London</option>
        </select>

        {/* Sélecteur de catégorie */}
        <select className="flex-1 px-6 py-6 text-gray-700 focus:outline-none bg-transparent appearance-none text-base border-l border-gray-300 min-w-0">
          <option>Select Category</option>
          <option>Technology</option>
          <option>Finance</option>
          <option>Marketing</option>
        </select>

        {/* Bouton de recherche */}
        <button className="bg-[#309689] hover:bg-[#26786e] text-white flex items-center gap-2 px-8 py-6 font-medium transition-colors rounded-r-lg h-full">
          <FiSearch className="text-lg" />
          Search Job
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
