import { Sticker as Sticky, Plus, List, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const { pathname } = useLocation();

  // 👇 Setup dark mode state (initially based on localStorage or system preference)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 👇 Effect to apply dark class to <html> element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // 👇 Toggle function
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-yellow-600 font-bold text-xl">
            <Sticky size={24} />
            <span>Sticky Notes</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                pathname === '/'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <Plus size={18} />
              <span>Create</span>
            </Link>

            <Link
              to="/notes"
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                pathname === '/notes'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <List size={18} />
              <span>View All</span>
            </Link>

            {/* 👇 Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
