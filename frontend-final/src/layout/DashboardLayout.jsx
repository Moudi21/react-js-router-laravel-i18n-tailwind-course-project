import {useState} from "react";
import {Outlet, NavLink} from "react-router";
import TopButton from "../components/TopButton";
import {motion, AnimatePresence} from 'framer-motion';
import SidebarDashboard from "../components/SidebarDashboard";
import {FaBars, FaTimes} from 'react-icons/fa';
import UserDropdown from "../components/UserDropdown";
import Logo from "../components/Logo";

function DashboardLayout() {
  const [ open, setOpen ] = useState( false );

  /* {
    id: 'courses', type: 'dropdown', title: 'Courses', media: '📚',
    children: [ {id: 'all', title: 'All Courses', href: '/courses'} ]
  } */

  const links = [
    {id: 'home', type: 'link', title: 'dashboard', href: '/dashboard', media: '🏠', active: true},
    {
      id: 'courses', type: 'link', title: 'courses', href: '/dashboard/add-courses', media: '📂',
    },
    {
      id: 'categories', type: 'link', title: 'Categories', href: '/dashboard/categories', media: '📂',
    },
    {
      id: 'PageData', type: 'link', title: 'PageData', href: '/dashboard/page-data', media: '📂',
    }
  ];

  return (
    <div className="bg-app min-h-screen">
      <header className="top-0 z-20 sticky flex justify-between items-center bg-app px-4 py-3 dark:border-slate-700 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen( v => !v )}
            aria-expanded={open}
            aria-controls="sidebar"
            className="inline-flex justify-center items-center hover:bg-gray-100 dark:hover:bg-slate-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
            title={open ? 'Close sidebar' : 'Open sidebar'}
          >
            {!open ? (
              <span className="flex flex-col gap-1">
                <span className="block bg-current w-5 h-[2px]" />
                <span className="block bg-current w-5 h-[2px]" />
                <span className="block bg-current w-5 h-[2px]" />
              </span>
            ) : (
              <FaTimes className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <Logo />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <UserDropdown />
        </div>
      </header>

      {/* Page Content */}

      <div className="flex">
        <Outlet />
      </div>


      <SidebarDashboard open={open} onClose={() => setOpen( false )} links={links} />
      <TopButton />
    </div>
  );
};

export default DashboardLayout;