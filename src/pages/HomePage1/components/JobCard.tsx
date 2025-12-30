import React from 'react';
import { FiClock, FiMapPin, FiBookmark } from 'react-icons/fi';
import { Link } from 'react-router-dom';

type JobProps = {
  id:number
  title: string;
  company: string;
  industry: string;
  type: string;
  salary: string;
  location: string;
  logoUrl?: string;
  timeAgo?: string;
};

const JobCard: React.FC<JobProps> = ({
  id,
  title,
  company,
  industry,
  type,
  salary,
  location,
  logoUrl,
  timeAgo = '10 min ago',
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
        <div className="flex items-center gap-1 bg-[#3096891A] p-2 rounded-lg">
          <FiClock />
          <span>{timeAgo}</span>
        </div>
        <FiBookmark className="cursor-pointer hover:text-blue-600" size={20} />
      </div>

      {/* Middle section: logo + title/subtitle */}
      <div className="flex items-center gap-4 mb-4">
        {logoUrl && (
          <img src={logoUrl} alt={`${company} logo`} className="w-12 h-12 object-contain rounded" />
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600">{company} • {industry}</p>
        </div>
      </div>

      {/* Bottom section: info + apply button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1"><img src='assets/images/job/briefcase.png' alt='briefcase' className='w-5 h-5' /> {type}</div>
          <div className="flex items-center gap-1"><img src='assets/images/job/clock.png' alt='briefcase' className='w-5 h-5' />Full Name</div>
          <div className="flex items-center gap-1"><img src='assets/images/job/g135.png' alt='briefcase' className='w-5 h-5' /> {salary}</div>
          <div className="flex items-center gap-1"><FiMapPin color="#309689" size={20} /> {location}</div>
        </div>
    <Link to={`/job/${id}`}>
  <button className="bg-[#309689] text-white px-4 py-2 rounded hover:bg-blue-700 transition">
    Apply
  </button>
</Link>
      </div>
    </div>
  );
};

export default JobCard;
