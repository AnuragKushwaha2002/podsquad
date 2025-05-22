'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/contexts/AuthContext';
import { Bell, MailPlus, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-black/30 backdrop-blur-lg px-6 py-2 rounded-full max-w-4xl mx-auto mt-6 flex items-center justify-between sticky top-6 z-50 shadow-md text-white">
      {/* Left - Logo */}
      <Link href="/" className="text-2xl font-bold text-white">Podsquad</Link>

      {/* Center - Main Links */}
      <ul className="hidden md:flex space-x-6 items-center font-medium flex-1 justify-center">
        <li><Link href="/podcasts" className="hover:text-gray-300">Explore</Link></li>
        <li><Link href="/create" className="hover:text-gray-300 flex items-center gap-1"><PlusCircle size={18} />Create New</Link></li>
        {user && (
          <>
            <li><Link href="/invites" className="hover:text-gray-300 flex items-center gap-1"><MailPlus size={18} />Invites</Link></li>
            <li><Link href="/notifications" className="hover:text-gray-300 flex items-center gap-1"><Bell size={18} />Notifications</Link></li>
          </>
        )}
      </ul>

      {/* Right - Auth/Profile */}
      <div className="hidden md:flex items-center space-x-4">
        {!user ? (
          <>
            <Link href="/login" className="hover:text-gray-300 font-medium">Login</Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition font-medium"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${user.username}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50 py-2 text-sm">
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-black text-white shadow-md px-6 py-4 space-y-4 z-50 md:hidden font-medium">
          <li><Link href="/podcasts" onClick={toggleMenu}>Explore</Link></li>
          <li><Link href="/create" onClick={toggleMenu}>Create New</Link></li>
          {user && (
            <>
              <li><Link href="/invites" onClick={toggleMenu}>Invites</Link></li>
              <li><Link href="/notifications" onClick={toggleMenu}>Notifications</Link></li>
            </>
          )}

          {!user ? (
            <>
              <li><Link href="/login" onClick={toggleMenu}>Login</Link></li>
              <li>
                <Link
                  href="/signup"
                  className="block px-4 py-2 rounded-md bg-white text-black text-center"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/profile" onClick={toggleMenu}>Profile</Link></li>
              <li><Link href="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="text-red-400"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}
