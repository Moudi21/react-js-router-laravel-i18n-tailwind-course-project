import React, {useState, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import LinkTo from './LinkTo';
import BtnTheme from './BtnTheme';

const TopNav = () => {
  const [ isMobileNavOpen, setIsMobileNavOpen ] = useState( false );
  const mobileNavRef = useRef( null );

  const {t} = useTranslation();

  // Close dropdowns when clicking outside
  useEffect( () => {
    const handleClickOutside = ( event ) => {
      if ( mobileNavRef.current && !mobileNavRef.current.contains( event.target ) ) {
        setIsMobileNavOpen( false );
      }
    };

    document.addEventListener( 'mousedown', handleClickOutside );
    return () => {
      document.removeEventListener( 'mousedown', handleClickOutside );
    };
  }, [] );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 custom-container">
      <div className="flex justify-between items-center py-1">
        {/* Left side - Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6">

          <LinkTo to="/" activeClass="text-blue-600"
            className="font-medium text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer" >
            {t( "home" )}
          </LinkTo>

          <LinkTo to="/courses" activeClass="text-blue-600"
            className="font-medium text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer" >
            {t( "courses" )}
          </LinkTo>

          <LinkTo to="/about" activeClass="font-semibold text-blue-600"
            className="font-medium text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer" >
            {t( "about.link" )}
          </LinkTo>

          <LinkTo to="/contact" activeClass="font-semibold text-blue-600"
            className="font-medium text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer" >
            {t( "contact.us" )}
          </LinkTo>

          <LinkTo to="/faqs" activeClass="font-semibold text-blue-600"
            className="font-medium text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer" >
            {t( "faqs" )}
          </LinkTo>

          <LinkTo to="/terms" activeClass="font-semibold text-blue-600"
            className="font-medium text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer" >
            {t( "term" )}
          </LinkTo>

        </div>

        {/* Mobile Navigation - Hidden on desktop */}
        <div className="lg:hidden relative" ref={mobileNavRef}>
          <button
            onClick={() => setIsMobileNavOpen( !isMobileNavOpen )}
            className="flex items-center space-x-2 focus:outline-none font-medium text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span>{t( "menu" )}</span>
            <svg
              className={`h-3 w-3 transition-transform duration-200 ${ isMobileNavOpen ? 'rotate-180' : '' }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Mobile Navigation Dropdown */}
          {isMobileNavOpen && (
            <div className="z-50 absolute bg-app shadow-lg mt-2 border border-gray-200 dark:border-gray-600 rounded-md w-40 s-0">
              <div className="py-1">
                <LinkTo to="/" activeClass="text-blue-600 font-semibold bg-gray-200 dark:bg-gray-700"
                  className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileNavOpen( false )}
                >
                  {t( "home" )}
                </LinkTo >
                <LinkTo to="/courses" activeClass="text-blue-600 font-semibold bg-gray-200 dark:bg-gray-700"
                  className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileNavOpen( false )}
                >
                  {t( "courses" )}
                </LinkTo>
                <LinkTo to="/about" activeClass="text-blue-600 font-semibold bg-gray-200 dark:bg-gray-700"
                  className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileNavOpen( false )}
                >
                  {t( "about.link" )}
                </LinkTo >
                <LinkTo to="/contact" activeClass="text-blue-600 font-semibold bg-gray-200 dark:bg-gray-700"
                  className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileNavOpen( false )}
                >
                  {t( "contact.us" )}
                </LinkTo>
                <LinkTo to="/faqs" activeClass="text-blue-600 font-semibold bg-gray-200 dark:bg-gray-700"
                  className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileNavOpen( false )}
                >
                  {t( "faqs" )}
                </LinkTo >
                <LinkTo to="/Terms" activeClass="text-blue-600 font-semibold bg-gray-200 dark:bg-gray-700"
                  className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 text-app-color hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileNavOpen( false )}
                >
                  {t( "Terms" )}
                </LinkTo >
              </div>
            </div>
          )}
        </div>

        {/* Right side - Phone Number and Language Selector */}
        <div className="flex items-center space-x-2">
          {/* Phone Number */}
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-app-color"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="font-medium text-app-color text-sm">
              +1 (555) 123-4567
            </span>
          </div>
          {/* Btn Themme */}
          <BtnTheme />
          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
