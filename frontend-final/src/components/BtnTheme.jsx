import React, {useContext, useState} from 'react';
import {ThemeContext} from '../contexts/ThemeProvider';
import {useTranslation} from 'react-i18next';

import {HiOutlineSun, HiOutlineMoon} from "react-icons/hi";

function BtnTheme() {
  const {theme, changeTheme} = useContext( ThemeContext );
  const [ isDarkMode, setIsDarkMode ] = useState( theme === 'dark' );
  const [ isRotating, setIsRotating ] = useState( false );

  const {t} = useTranslation();

  const toggleTheme = () => {
    setIsDarkMode( ( prevMode ) => !prevMode );
    changeTheme();
    setIsRotating( true );
    setTimeout( () => setIsRotating( false ), 400 ); // Reset rotation after animation
  };

  return (
    <h3
      onClick={toggleTheme}
      className="flex items-center gap-1 px-1 rounded font-medium text-app-color hover:text-blue-600 text-sm transition-all duration-200 cursor-pointer"
    >
      <span
        className={`inline-block transition-transform duration-400 ${ isRotating ? 'rotate-60' : '-rotate-4' }`}
      >
        {isDarkMode ? <HiOutlineMoon className='px-1 text-3xl' /> : <HiOutlineSun className='px-1 text-3xl' />}
      </span>
      {t( theme )}
    </h3>
  );
}

export default BtnTheme;