import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Github } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Detection", path: "/detection" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
            >
              ObjectDetect
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-white/10 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-6 w-px bg-white/10 mx-2"></div>

              <a
                href="#"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/5"
              >
                <Github size={20} />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-dark-card border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
