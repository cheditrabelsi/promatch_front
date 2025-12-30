import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white px-6 lg:px-24 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Job Section */}
        <div>
          <div className="flex items-center mb-4">
            <div className=" text-gray-900 p-2 rounded-full mr-2">
             <img src='assets/images/home/briefcase.png' className='w-8 h-8'/>
            </div>
            <h2 className="text-xl font-bold">Job</h2>
          </div>
          <p className="text-sm text-gray-400">
            Quis enim pellentesque viverra tellus eget malesuada facilisis. Congue nibh vivamus aliquet nunc mauris d...
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#">For Candidates</a></li>
            <li><a href="#">For Employees</a></li>
          </ul>
        </div>

        {/* Job Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Job Categories</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">Telecommunications</a></li>
            <li><a href="#">Hotels & Tourism</a></li>
            <li><a href="#">Construction</a></li>
            <li><a href="#">Education</a></li>
            <li><a href="#">Financial Services</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">
            Eu nunc pretium vitae platea. Non metus elementum vulputate.
          </p>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 mb-3"
          />
          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded">
            Subscribe now
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© Copyright Job Portal 2024. Designed by Figma.guru</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
