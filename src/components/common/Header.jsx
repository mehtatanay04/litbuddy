import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile.jsx';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useProfile();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/learn', label: 'Learn', icon: '📚' },
    { path: '/games', label: 'Games', icon: '🎮' },
    { path: '/stories', label: 'Stories', icon: '📖' },
    { path: '/rewards', label: 'Rewards', icon: '🏆' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-4xl">📚</div>
            <div>
              <h1 className="text-2xl font-bold text-white">LitBuddy</h1>
              <p className="text-blue-100 text-sm">Your Reading Companion</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {profile && (
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-1">
                <span className="text-yellow-300 text-lg">⭐</span>
                <span className="text-white font-bold">{profile.points}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Link
                to="/profile"
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                title="Profile"
              >
                <span className="text-2xl">👤</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                title="Logout"
              >
                <span className="text-2xl">🚪</span>
              </button>
            </div>
          </div>
        </div>

        <nav className="mt-4">
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;