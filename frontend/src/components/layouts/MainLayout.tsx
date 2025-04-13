import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaHome, FaNewspaper, FaFire, FaUser, FaSignInAlt, FaSignOutAlt, FaUserShield } from 'react-icons/fa';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="text-2xl font-bold text-red-600">
              Inshorts
            </NavLink>

            <nav className="hidden md:flex space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded ${isActive ? 'bg-red-100 text-red-600' : 'hover:bg-red-50'}`
                }
              >
                <FaHome className="text-lg" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/newest"
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded ${isActive ? 'bg-red-100 text-red-600' : 'hover:bg-red-50'}`
                }
              >
                <FaNewspaper className="text-lg" />
                <span>Newest</span>
              </NavLink>
              <NavLink
                to="/trending"
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded ${isActive ? 'bg-red-100 text-red-600' : 'hover:bg-red-50'}`
                }
              >
                <FaFire className="text-lg" />
                <span>Trending</span>
              </NavLink>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-1">
                    <FaUser className="text-gray-500" />
                    <span className="text-sm font-semibold">{user.username}</span>
                  </div>

                  {user.roles.includes('ROLE_ADMIN') && (
                    <NavLink
                      to="/admin"
                      className="flex items-center space-x-1 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      <FaUserShield className="text-lg" />
                      <span>Admin</span>
                    </NavLink>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="flex items-center space-x-1 px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  <FaSignInAlt className="text-lg" />
                  <span>Login</span>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} Inshorts Clone. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-red-600">Terms</a>
              <a href="#" className="text-gray-600 hover:text-red-600">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-red-600">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
