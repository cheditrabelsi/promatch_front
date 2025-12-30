import React from 'react';
import { FaStar, FaQuoteRight } from 'react-icons/fa';

type TestimonialProps = {
  title: string;
  text: string;
  name: string;
  role: string;
};

const TestimonialCard: React.FC<TestimonialProps> = ({ title, text, name, role }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      {/* Stars */}
      <div className="flex mb-4 text-yellow-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

      {/* Text */}
      <p className="text-gray-600 mb-4">{text}</p>

      {/* Footer */}
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
        <div>
          <p className="text-sm font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      {/* Quote icon */}
      <FaQuoteRight className="absolute bottom-4 right-4 text-teal-500 text-xl" />
    </div>
  );
};

export default TestimonialCard;
