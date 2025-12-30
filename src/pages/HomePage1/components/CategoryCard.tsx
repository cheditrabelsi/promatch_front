import React from 'react';

type CategoryProps = {
  icon: React.ReactNode;
  title: string;
  count: number;
};

const CategoryCard: React.FC<CategoryProps> = ({ icon, title, count }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
      <div className="text-teal-600 text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-teal-500 mt-2">{count} jobs</p>
    </div>
  );
};

export default CategoryCard;
