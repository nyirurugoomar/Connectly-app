import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400 px-4 sm:px-6 lg:px-8">
      <img
        onClick={() => navigate("/home")}
        className="w-20 sm:w-24 md:w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />
      
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-start gap-5 cursor-pointer text-black font-medium">
        <NavLink to="/home">
          <li className="py-1 text-[18px]">Home</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/services">
          <li className="py-1 text-[18px]">Services</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about-us">
          <li className="py-1 text-[18px]">About Us</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 text-[18px]">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* Desktop Profile or Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated && user ? (
          // Logged in: show username and popover
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <span className="text-black font-semibold">{user.fullName}</span>
            <img
              className="w-8 h-8 rounded-full bg-white"
              src={assets.userProfile}
              alt="profile"
            />
            {/* Popover card */}
            <div className="absolute top-0 right-0 pt-18 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded shadow-lg flex flex-col gap-2 p-4">
                <button
                  onClick={() => navigate('/my-profile')}
                  className="hover:text-black text-left"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate('/request-history')}
                  className="hover:text-black text-left"
                >
                  Request History
                </button>
                <button
                  onClick={handleLogout}
                  className="hover:text-black text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Not logged in: show Sign Up and Log In buttons
          <>
            <button
              onClick={() => navigate('/signup')}
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="bg-gray-100 text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Log In
            </button>
          </>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-black p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed top-0 right-0 h-full w-64 bg-[#f9fbfd] shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black p-2"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* User Profile Section or Auth Buttons */}
              {isAuthenticated && user ? (
                <div className="px-4 py-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-full bg-white"
                      src={assets.userProfile}
                      alt="profile"
                    />
                    <div>
                      <p className="text-black font-medium">{user.fullName}</p>
                      <p className="text-black text-sm">Welcome back!</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6 border-b border-gray-200 flex gap-2">
                  <button
                    onClick={() => { setIsMenuOpen(false); navigate('/signup'); }}
                    className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => { setIsMenuOpen(false); navigate('/signin'); }}
                    className="bg-gray-100 text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition w-full"
                  >
                    Log In
                  </button>
                </div>
              )}

              {/* Mobile Navigation Menu */}
              <nav className="flex-1 px-4 py-6">
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => handleNavigation('/home')}
                      className="text-black text-lg font-medium w-full text-left"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation('/services')}
                      className="text-black text-lg font-medium w-full text-left"
                    >
                      Services
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation('/about-us')}
                      className="text-black text-lg font-medium w-full text-left"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation('/contact')}
                      className="text-black text-lg font-medium w-full text-left"
                    >
                      Contact
                    </button>
                  </li>
                  {isAuthenticated && (
                    <li>
                      <button
                        onClick={() => handleNavigation('/my-profile')}
                        className="text-black text-lg font-medium w-full text-left"
                      >
                        My Profile
                      </button>
                    </li>
                  )}
                </ul>
              </nav>

              {/* Logout button for mobile */}
              {isAuthenticated && (
                <div className="px-4 py-6 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;