import {
  BriefcaseIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  TagIcon,
  AcademicCapIcon
} from "@heroicons/react/16/solid";
import { FiCheck } from "react-icons/fi";
import ContactForm from "./ContactForm";
import axios from "axios";
import { useEffect, useState } from "react";

interface JobListingProps {
  id: number;
}

const JobListing: React.FC<JobListingProps> = ({ id }) => {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}/`);
        setJob(response.data);
      } catch {
        console.error("Erreur API");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const requirementsList =
    job?.requirements?.split(",").map((r: string) => r.trim()) || [];

  return (
    <div className="flex flex-col md:flex-row p-10 bg-white min-h-screen gap-10">

      {/* ---------------- LEFT SECTION ---------------- */}
      <div className="md:w-2/3">

        {/* Title + Company */}
        <h1 className="text-3xl font-bold text-gray-900">{job?.title}</h1>
        <p className="text-gray-500 mb-6">{job?.recruiter_email}</p>

        {/* Job Info Line */}
        <div className="flex flex-wrap gap-6 text-gray-600 text-sm mb-10">
          <span className="flex items-center gap-2">
            <TagIcon className="h-5 w-5 text-[#309689]" />
            {job?.category}
          </span>

          <span className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-[#309689]" />
            {job?.job_type}
          </span>

          <span className="flex items-center gap-2">
            <CurrencyDollarIcon className="h-5 w-5 text-[#309689]" />
            {job?.salary}
          </span>

          <span className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-[#309689]" />
            {job?.location}
          </span>
        </div>

        {/* Job Description */}
        <h2 className="text-2xl font-bold mb-4">Job Description</h2>
        <p className="text-gray-700 leading-7 mb-10">{job?.description}</p>

        {/* Key Responsibilities */}
        <h2 className="text-xl font-semibold mb-4">Key Responsibilities</h2>

        <ul className="space-y-3 mb-10">
          {requirementsList.map((item: string, idx: number) => (
            <li key={idx} className="flex items-center gap-3">
              <FiCheck className="text-green-600" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>

        {/* Professional Skills
        <h2 className="text-xl font-semibold mb-4">Professional Skills</h2>

        <ul className="space-y-3 mb-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <li className="flex items-center gap-3" key={i}>
              <FiCheck className="text-green-600" />
              <span className="text-gray-700">
                Lorem ipsum dolor sit amet adipiscing cursus…
              </span>
            </li>
          ))}
        </ul> */}

        {/* Tags 
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Tags</h2>

          <div className="flex flex-wrap gap-3">
            {["Full time", "Commerce", "Location", "Corporate"].map(
              (tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
*/}
        {/* Share 
        <div className="flex gap-4 mt-6 text-gray-600">
          <i className="ri-facebook-fill text-xl"></i>
          <i className="ri-twitter-x-line text-xl"></i>
          <i className="ri-linkedin-fill text-xl"></i>
        </div>*/}
      </div>

      {/* ---------------- RIGHT SECTION ---------------- */}
      <div className="md:w-1/3 bg-white rounded-lg flex flex-col gap-6">

        {/* Apply Job Button */}
        <button className="bg-[#309689] text-white py-3 rounded-lg font-semibold hover:bg-[#257a70] transition">
          Apply Job
        </button>

        {/* Job Overview Card */}
        <div className="p-6 bg-[#EBF5F4] rounded-lg">
          <h2 className="text-xl font-bold mb-6">Job Overview</h2>

          <div className="space-y-6">

            <div className="flex gap-3">
              <BriefcaseIcon className="h-6 w-6 text-[#309689]" />
              <div>
                <p className="font-semibold text-gray-800">Job Title</p>
                <p>{job?.title}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <ClockIcon className="h-6 w-6 text-[#309689]" />
              <div>
                <p className="font-semibold text-gray-800">Job Type</p>
                <p>{job?.job_type}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <TagIcon className="h-6 w-6 text-[#309689]" />
              <div>
                <p className="font-semibold">Category</p>
                <p>{job?.category}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <AcademicCapIcon className="h-6 w-6 text-[#309689]" />
              <div>
                <p className="font-semibold text-gray-800">Experience</p>
                <p>{job?.experience || "N/A"}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CurrencyDollarIcon className="h-6 w-6 text-[#309689]" />
              <div>
                <p className="font-semibold">Offered Salary</p>
                <p>{job?.salary}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPinIcon className="h-6 w-6 text-[#309689]" />
              <div>
                <p className="font-semibold text-gray-800">Location</p>
                <p>{job?.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
};

export default JobListing;
