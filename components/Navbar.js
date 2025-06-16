import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout, getUserData } from '../utils/auth';
import { 
  FiHome, FiDollarSign, FiPieChart, FiTarget, 
  FiBell, FiUser, FiSettings, FiLogOut, FiMenu, FiX
} from 'react-icons/fi';

function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data when component mounts
    const user = getUserData();
    setUserData(user);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userData || !userData.name) return 'U';
    return userData.name.split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link href="/dashboard">
            <a className="btn btn-ghost normal-case text-xl flex items-center">
              <FiDollarSign className="text-primary mr-2" />
              <span className="font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Financer</span>
            </a>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="flex-none hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <Link href="/dashboard">
                <a className={`hover:text-primary transition-all duration-300 ${router.pathname === '/dashboard' ? 'text-primary font-medium' : ''}`}>
                  <FiHome />
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
              <Link href="/transactions">
                <a className={`hover:text-primary transition-all duration-300 ${router.pathname.startsWith('/transactions') ? 'text-primary font-medium' : ''}`}>
                  <FiDollarSign />
                  Transactions
                </a>
              </Link>
            </li>
            <li>
              <Link href="/budgets">
                <a className={`hover:text-primary transition-all duration-300 ${router.pathname.startsWith('/budgets') ? 'text-primary font-medium' : ''}`}>
                  <FiPieChart />
                  Budgets
                </a>
              </Link>
            </li>
            <li>
              <Link href="/goals">
                <a className={`hover:text-primary transition-all duration-300 ${router.pathname.startsWith('/goals') ? 'text-primary font-medium' : ''}`}>
                  <FiTarget />
                  Goals
                </a>
              </Link>
            </li>
          </ul>
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-full w-10 hover:shadow-lg transition-all duration-300">
                <span>{getUserInitials()}</span>
              </div>
            </label>
            
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>{userData?.name || 'User'}</span>
              </li>
              <li>
                <Link href="/profile">
                  <a>
                    <FiUser />
                    Profile
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <a>
                    <FiSettings />
                    Settings
                  </a>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <FiLogOut />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex-none md:hidden">
          <button className="btn btn-ghost btn-circle" onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-base-100 shadow-lg z-50">
          <ul className="menu p-4">
            <li className="menu-title">
              <span>{userData?.name || 'User'}</span>
            </li>
            <li>
              <Link href="/dashboard">
                <a className={router.pathname === '/dashboard' ? 'active font-medium text-primary' : ''}>
                  <FiHome />
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
              <Link href="/transactions">
                <a className={router.pathname.startsWith('/transactions') ? 'active font-medium text-primary' : ''}>
                  <FiDollarSign />
                  Transactions
                </a>
              </Link>
            </li>
            <li>
              <Link href="/budgets">
                <a className={router.pathname.startsWith('/budgets') ? 'active font-medium text-primary' : ''}>
                  <FiPieChart />
                  Budgets
                </a>
              </Link>
            </li>
            <li>
              <Link href="/goals">
                <a className={router.pathname.startsWith('/goals') ? 'active font-medium text-primary' : ''}>
                  <FiTarget />
                  Goals
                </a>
              </Link>
            </li>
            <li className="divider"></li>
            <li>
              <Link href="/profile">
                <a>
                  <FiUser />
                  Profile
                </a>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <a>
                  <FiSettings />
                  Settings
                </a>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-error">
                <FiLogOut />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>  );
}

export default Navbar;
