import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {

  return (
    <nav className="flex flex-wrap justify-between items-center mb-8">
      <div className="text-2xl font-bold">ProMatch</div>

      <div className="space-x-4">
        <Link to="/" className="hover:text-green-400">
          Home
        </Link>
        <Link to="/my-jobs" className="hover:text-green-400">
          Jobs
        </Link>
        <Link to="/about" className="hover:text-green-400">
          About Us
        </Link>
        <Link to="/contact" className="hover:text-green-400">
          Contact Us
        </Link>
      </div>

      <div>
        <Link to="/login">
          <button className="bg-transparent hover:bg-green-500 text-[#309689] font-semibold hover:text-white py-2 px-4 border border-[#309689] hover:border-transparent rounded">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-[#309689] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded ml-2">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
