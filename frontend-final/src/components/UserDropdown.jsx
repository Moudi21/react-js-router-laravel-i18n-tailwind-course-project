import {useState, useContext, useEffect, useRef} from 'react';
import {useLocation} from 'react-router';
import {HiOutlineArrowRightEndOnRectangle} from "react-icons/hi2";
import {UserContext} from '../contexts/UserProvider';
import {t} from 'i18next';
import LinkTo from './LinkTo';
import BtnTheme from './BtnTheme';
import api from '../utils/api';
import LanguageSelector from './LanguageSelector';

export default function UserDropdown() {
  const {user, logout} = useContext( UserContext );
  const [ isOpen, setIsOpen ] = useState( false );
  const dropdownRef = useRef( null );

  const location = useLocation();

  const isDashboard = location.pathname.startsWith( '/dashboard' );

  const toggleDropdown = () => setIsOpen( prev => !prev );

  useEffect( () => {
    function handleClickOutside( event ) {
      if ( dropdownRef.current && !dropdownRef.current.contains( event.target ) ) {
        setIsOpen( false );
      }
    }

    document.addEventListener( "mousedown", handleClickOutside );
    return () => document.removeEventListener( "mousedown", handleClickOutside );
  }, [] );

  return (
    <div ref={dropdownRef} className="relative">
      {/* Avatar or Name Button */}
      <span className="flex items-center gap-2">
        <span
          className="flex justify-center items-center bg-gray-300 dark:bg-gray-900 p-1 rounded-full w-10 h-10 overflow-hidden font-semibold text-app-color text-lg uppercase cursor-pointer"
          onClick={toggleDropdown}
        >

          {user?.photo && <img className="rounded-full w-full h-full overflow-hidden" src={`${ api.defaults.baseURL }/storage/${ user.photo }`} alt="User Photo" /> || user?.fullname?.charAt( 0 ) || "U"}
        </span>
      </span>

      {/* Dropdown Menu */}
      <div className={`z-50 absolute bg-app dark:bg-gray-800 shadow-lg mt-2 border border-gray-200 dark:border-gray-700 rounded-xl w-55 overflow-hidden text-app-color transition-all duration-200 transform end-0 ${ isOpen
        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
        : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`}>
        <div className="flex flex-col p-3 border-gray-200 dark:border-gray-600 border-b w-full overflow-hidden text-gray-700 dark:text-gray-200 text-sm">
          Signed in as
          <strong className='capitalize'>{user?.fullname || "User"}</strong>
          <span className='font-semibold text-gray-500 text-xs'>{user?.email}</span>
          <span className='font-semibold text-gray-500 capitalize'>{user?.role}</span>
        </div>
        <div className="flex flex-col py-1 w-full">

          {user?.role === "admin" &&
            <LinkTo to="/dashboard" activeClass="font-semibold bg-gray-100 dark:bg-gray-700"
              className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 w-full text-gray-700 dark:text-gray-200 text-sm text-start cursor-pointer" >
              {t( "Dashboard" )}
            </LinkTo>}

          <LinkTo to="/profile" activeClass="font-semibold bg-gray-100 dark:bg-gray-700"
            className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 w-full text-gray-700 dark:text-gray-200 text-sm text-start cursor-pointer" >
            {t( "profile" )}
          </LinkTo>

          {isDashboard &&
            <>
              <span className="inline-block hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 w-full text-gray-700 dark:text-gray-200 text-sm text-start cursor-pointer">
                <LanguageSelector />
              </span>

              <span className="inline-block hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-2 w-full text-gray-700 dark:text-gray-200 text-sm text-start cursor-pointer">
                <BtnTheme />
              </span>
            </>
          }

          <button
            onClick={logout}
            className="flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 w-full text-red-600 text-sm text-start cursor-pointer"
          >
            <HiOutlineArrowRightEndOnRectangle /> Logout
          </button>

        </div>
      </div>
    </div>
  );
}
