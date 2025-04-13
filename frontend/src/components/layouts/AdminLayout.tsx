import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaTachometerAlt,
  FaNewspaper,
  FaPlus,
  FaSignOutAlt,
  FaArrowLeft
} from 'react-icons/fa';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold flex items-center">
            <span className="text-red-500">Inshorts</span>
            <span className="ml-2">Admin</span>
          </h1>
        </div>

        <nav className="mt-6">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-3 ${isActive ? 'bg-gray-800 border-l-4 border-red-500' : 'hover:bg-gray-800'}`
            }
          >
            <FaTachometerAlt className="mr-3" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/articles"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 ${isActive ? 'bg-gray-800 border-l-4 border-red-500' : 'hover:bg-gray-800'}`
            }
          >
            <FaNewspaper className="mr-3" />
            <span>Articles</span>
          </NavLink>

          <NavLink
            to="/admin/articles/new"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 ${isActive ? 'bg-gray-800 border-l-4 border-red-500' : 'hover:bg-gray-800'}`
            }
          >
            <FaPlus className="mr-3" />
            <span>New Article</span>
          </NavLink>
        </nav>

        <div className="absolute bottom-0 w-64 border-t border-gray-800">
          <NavLink
            to="/"
            className="flex items-center px-4 py-3 hover:bg-gray-800"
          >
            <FaArrowLeft className="mr-3" />
            <span>Back to Site</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-red-400 hover:bg-gray-800 w-full text-left"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm py-4 px-6">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        </header>

        <main className="flex-1 bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
