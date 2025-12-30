import React from 'react';
import {
  FaLeaf,
  FaIndustry,
  FaShoppingBag,
  FaHardHat,
  FaSuitcase,
  FaGraduationCap,
  FaMoneyBillWave,
  FaBus,
} from 'react-icons/fa';
import CategoryCard from '../components/CategoryCard';

const categories = [
  { icon: <FaLeaf />, title: 'Agriculture', count: 1254 },
  { icon: <FaIndustry />, title: 'Metal Production', count: 816 },
  { icon: <FaShoppingBag />, title: 'Commerce', count: 2082 },
  { icon: <FaHardHat />, title: 'Construction', count: 1520 },
  { icon: <FaSuitcase />, title: 'Hotels & Tourism', count: 1022 },
  { icon: <FaGraduationCap />, title: 'Education', count: 1496 },
  { icon: <FaMoneyBillWave />, title: 'Financial Services', count: 1529 },
  { icon: <FaBus />, title: 'Transport', count: 1240 },
];

const CategoryGrid: React.FC = () => {
  return (
    <div className="bg-teal-50 py-12 px-6 lg:px-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Browse by Category</h2>
        <p className="text-gray-600 mt-2">
          At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scelerisque.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <CategoryCard key={index} icon={cat.icon} title={cat.title} count={cat.count} />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
