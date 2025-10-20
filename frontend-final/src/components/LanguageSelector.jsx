import React, {useState, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';

const LanguageSelector = () => {
  const [ isDropdownOpen, setIsDropdownOpen ] = useState( false );
  const dropdownRef = useRef( null );
  const {t, i18n} = useTranslation();

  const languages = [
    {code: 'en', name: 'English', label: 'EN'},
    {code: 'ar', name: 'العربية', label: 'AR'}
  ];

  const currentLang = i18n.language || 'en';
  const currentLanguage = languages.find( lang => lang.code === currentLang ) || languages[ 0 ];

  const changeLanguage = ( code ) => {
    i18n.changeLanguage( code );
    setIsDropdownOpen( false );
  };

  // Set document direction and language
  useEffect( () => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [ i18n.language ] );


  // Close dropdown when clicking outside
  useEffect( () => {
    const handleClickOutside = ( event ) => {
      if ( dropdownRef.current && !dropdownRef.current.contains( event.target ) ) {
        setIsDropdownOpen( false );
      }
    };

    document.addEventListener( 'mousedown', handleClickOutside );
    return () => {
      document.removeEventListener( 'mousedown', handleClickOutside );
    };
  }, [] );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Selector Button */}
      <button
        onClick={() => setIsDropdownOpen( !isDropdownOpen )}
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
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span>{t( currentLanguage.label )}</span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${ isDropdownOpen ? 'rotate-180' : '' }`}
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

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="z-50 absolute bg-app shadow-lg mt-2 border border-gray-200 rounded-md w-36 end-0">
          <div className="py-1">
            {languages.map( ( lang ) => (
              <button
                key={lang.code}
                onClick={() => {
                  if ( currentLang !== lang.code ) {
                    changeLanguage( lang.code );
                  }
                }}
                className={`w-full text-end px-4 py-2 text-sm transition-colors duration-200 ${ currentLang === lang.code
                  ? 'bg-blue-100  dark:bg-gray-700 text-blue-500  font-medium cursor-not-allowed opacity-75'
                  : 'text-gray-700 hover:dark:bg-gray-700 hover:bg-gray-50 hover:text-blue-500 cursor-pointer'
                  }`}
              >
                <div className="flex justify-between items-center">
                  <span>{lang.label}</span>
                  <span className="text-gray-500 dark:text-gray-200 text-xs">{lang.name}</span>
                </div>
              </button>
            ) )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;