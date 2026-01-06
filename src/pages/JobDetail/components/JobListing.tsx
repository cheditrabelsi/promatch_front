import { AcademicCapIcon, BriefcaseIcon, ClockIcon, CurrencyDollarIcon, MapPinIcon, TagIcon } from "@heroicons/react/16/solid";
import { FiCheck } from "react-icons/fi";
import ContactForm from "./ContactForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
interface JobListingProps {
  id: number; // ou number selon ton backend
}

const JobListing: React.FC<JobListingProps> = ({ id }) => {

  const [job, setJob] = useState<any>(null); // stocke le job récupéré
const [loading, setLoading] = useState(true); // état de chargement
console.log("ID reçu:", id);

useEffect(() => {

  const fetchJob = async () => {
    try {
    
      const response = await axios.get(`http://127.0.0.1:8000/api/jobs/recent/`);
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
const requirementsList =
  job?.requirements?.split(",").map((r:string) => r.trim()) || [];

  return (
    <div className="flex flex-col md:flex-row p-6 bg-white min-h-screen">
      {/* Left Section */}
      <div className="md:w-2/3 bg-white p-6 ">
        <h2 className="text-2xl font-bold mb-4">Job Description</h2>
        <p className="text-gray-700 mb-6">
          {job?.description|| "Aucune description disponible."}
        </p>
        <h3 className="text-xl font-semibold mb-2">Key Responsibilities</h3>
      <ul className="space-y-2 mb-6 text-gray-700">
  {requirementsList.length > 0 ? (
    requirementsList.map((req:string, index:string) => (
      <li key={index} className="flex items-center gap-2">
        <FiCheck className="text-green-500" />
        <span>{req}</span>
      </li>
    ))
  ) : (
    <li className="text-gray-500">Aucun requirement trouvé</li>
  )}
</ul>
{/*

        <h3 className="text-xl font-semibold mb-2">Professional Skills</h3>
          <ul className="space-y-2 mb-6 text-gray-700">
  <li className="flex items-center gap-2">
    <FiCheck className="text-green-500" />
    <span>Lorem ipsum dolor sit amet</span>
  </li>
  <li className="flex items-center gap-2">
    <FiCheck className="text-green-500" />
    <span>Consectetur adipiscing elit</span>
  </li>
  <li className="flex items-center gap-2">
    <FiCheck className="text-green-500" />
    <span>Sed do eiusmod tempor</span>
  </li>
</ul>*/}
      </div>

      {/* Right Section */}
     
 <div className="md:w-1/3 mt-6 mb-24 md:mt-0 md:ml-6 bg-white p-6 rounded-lg">
  <h2 className="text-2xl font-bold mb-4">Job Overview</h2>

  <div className="space-y-4 text-gray-700">
    <div className="flex items-start gap-3">
      <BriefcaseIcon className="h-6 w-6 text-[#309689] mt-1" />
      <div>
        <p className="font-semibold text-gray-800">Job Title</p>
        <p>{job?.title|| "Aucune description disponible."} </p>
      </div>
    </div>
 <div className="flex items-start gap-3">
      <ClockIcon className="h-6 w-6 text-[#309689] mt-1" />
      <div>
        <p className="font-semibold text-gray-800">Job Type</p>
        <p> {job?.job_type|| "Aucune description disponible."}</p>
      </div>
    </div>
    <div className="flex items-start gap-3">
      <TagIcon className="h-6 w-6 text-[#309689] mt-1" />
      <div>
        <p className="font-semibold text-gray-800">Category</p>
        <p>{job?.category|| "Aucune description disponible."}</p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <ClockIcon className="h-6 w-6 text-[#309689] mt-1" />
      <div>
        <p className="font-semibold text-gray-800">Experience</p>
        <p>{job?.category|| "Aucune description disponible."}</p>
      </div>
    </div>

    {/*<div className="flex items-start gap-3">
      <AcademicCapIcon className="h-6 w-6 text-[#309689] mt-1" />
      <div>
        <p className="font-semibold text-gray-800">Degree</p>
        <p>Master</p>
      </div>
    </div>
    */}

    <div className="flex items-start gap-3">
      <CurrencyDollarIcon className="h-6 w-6 text-[#309689] mt-1" />
      <div>
        <p className="font-semibold text-gray-800">Salary</p>
        <p>{job?.salary|| "Aucune description disponible."} </p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <MapPinIcon className="h-6 w-6 text-[#309689] mt-1" />
      <div>
        <p className="font-semibold text-gray-800">Location</p>
         <p>{job?.location|| "Aucune description disponible."} </p>
      </div>
    </div>
  </div>

  {/* Map Placeholder
  <div className="mt-6 mb-24">
    <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-600 rounded-lg">
      Map Placeholder
    </div>
  </div> */}
  <div className="mt-8">
<ContactForm></ContactForm>
  </div>
  
</div>

    </div>
  );
};

export default JobListing;
