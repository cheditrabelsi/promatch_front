import React from 'react';
import TestimonialCard from '../components/TestimonialCard';

const testimonials = [
  {
    title: 'Amazing services',
    text: 'Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor. Etiam morbi euismod elementum augue faucibus.',
    name: 'Marco Kihn',
    role: 'Happy Client',
  },
  {
    title: 'Everything simple',
    text: 'Etiam enim et vestibulum venenatis urna. Eti morbi euismod elementum augue faucibus.',
    name: 'Kristin Hester',
    role: 'Happy Client',
  },
  {
    title: 'Awesome, thank you!',
    text: 'Rhoncus sed tristique in dolor. Eti morbi euismod elementum augue faucibus. Nulla ut fermentum erat.',
    name: 'Zion Cisneros',
    role: 'Happy Client',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <div className="bg-teal-50 py-12 px-6 lg:px-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Testimonials from Our Customers</h2>
        <p className="text-gray-600 mt-2">
          At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id...
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <TestimonialCard key={index} {...t} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
