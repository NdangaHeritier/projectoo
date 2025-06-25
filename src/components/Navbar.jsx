import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { PuzzlePieceIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      toast.error('Failed to log out');
    }
  }

  const [showName, setShowName] = useState(false);

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between py-4">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-4xl font-extrabold text-indigo-500 flex items-center gap-2">
                <img
                  src="/favicon.svg"
                  alt="Projectoo Logo"
                  className="h-12 w-12"
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4 relative">
                {/* <span className="text-gray-700">
                  {currentUser.displayName || currentUser.email}
                </span> */}
                <Link to={`#`} className='text-gray-700 dark:text-gray-300 font-semibold text-sm hover:text-gray-900 dark:hover:text-gray-50' >
                  Help
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
                <span
                  className="bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 rounded-full h-10 w-10 flex items-center justify-center text-base font-semibold cursor-pointer relative"
                  onMouseEnter={() => setShowName(true)}
                  onMouseLeave={() => setShowName(false)}
                  onClick={() => setShowName((prev) => !prev)}
                >
                  {currentUser.displayName
                    ? currentUser.displayName
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase())
                        .join('')
                    : currentUser.email.charAt(0).toUpperCase()}
                  {showName && (
                    <span className="absolute right-0 top-3/2 -translate-y-1/2 bg-white dark:bg-black rounded-lg shadow px-3 py-1 text-gray-800 dark:text-gray-300 text-sm font-medium z-10 whitespace-nowrap border border-gray-200 dark:border-gray-800">
                      {currentUser.displayName || currentUser.email}
                    </span>
                  )}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 dark:text-indigo-500 bg-white dark:bg-gray-900/70 dark:hover:bg-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 