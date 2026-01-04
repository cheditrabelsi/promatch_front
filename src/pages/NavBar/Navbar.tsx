import { useAuth } from '@/providers';
import { Link, useNavigate } from 'react-router-dom';


const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // ← on suppose que ton AuthContext expose logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();                     // ← appelle la fonction de déconnexion
    navigate('/');           // ← redirige vers login après logout
  };

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

        {/* Liens supplémentaires visibles uniquement quand connecté (optionnel) */}
        {isAuthenticated && (
          <>
            <Link to="/messages" className="hover:text-green-400">
              Messages
            </Link>
            <Link to="/profile" className="hover:text-green-400">
              Profile
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="text-[#309689] font-semibold hover:text-green-600"
            >
              Profil
            </Link>

            <button
              onClick={handleLogout}
              className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-transparent hover:bg-green-500 text-[#309689] font-semibold hover:text-white py-2 px-4 border border-[#309689] hover:border-transparent rounded">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="bg-[#309689] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;