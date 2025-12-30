import React from 'react';

type Company = {
  name: string;
  logo: string;
  description: string;
  jobs: number;
};

const companies: Company[] = [
  {
    name: 'Instagram',
    logo: '/logos/instagram.png', // Remplace par le bon chemin
    description: 'Etiam velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat.',
    jobs: 18,
  },
  {
    name: 'Tesla',
    logo: '/logos/tesla.png',
    description: 'At pellentesque amet odio cras imperdiet nisl. Ac magna aliquet massa leo.',
    jobs: 8,
  },
  {
    name: 'Apple',
    logo: '/logos/apple.png',
    description: 'El odio sem tellus ultrices posuere consequat. Tristique nascetur netus.',
    jobs: 6,
  },
];

const TopCompanies: React.FC = () => {
  return (
   <section className="py-16 px-6 md:px-12 bg-[#EBF5F4]">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-gray-900">Top Company</h2>
    <p className="mt-4 text-gray-600 max-w-xl mx-auto">
      At eu lobortis pretium tincidunt amet lacus eu aenean aliquet. Blandit a massa elementum.
    </p>
  </div>

  <div
    className={`grid gap-8 justify-center ${
      companies.length === 1
        ? 'grid-cols-1'
        : companies.length === 2
        ? 'grid-cols-2'
        : companies.length === 3
        ? 'grid-cols-3'
        : 'grid-cols-4'
    }`}
  >
    {companies.map((company, index) => (
      <div
        key={index}
        className="border rounded-xl p-6 shadow hover:shadow-lg transition duration-300 max-w-sm"
      >
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="h-12 mb-4 object-contain"
        />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{company.name}</h3>
        <p className="text-gray-600 mb-4">{company.description}</p>
        <button className="bg-[#3096890D] text-[#309689] px-4 py-2 rounded transition">
          {company.jobs} open jobs
        </button>
      </div>
    ))}
  </div>
</section>

  );
};

export default TopCompanies;
