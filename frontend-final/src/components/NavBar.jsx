import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Logo from "./Logo";
import Button from './Button';

import {UserContext} from '../contexts/UserProvider';

import TopNav from './TopNav';
import Categories from './Categories';
import UserDropdown from './UserDropdown';
import NotificationDropdown from './NotificationDropdown';
import Search from './Search';
import {BiSearch} from 'react-icons/bi';
import {IoCloseOutline} from 'react-icons/io5';


const NavBar = () => {
  const [ isMenuOpen, setIsMenuOpen ] = useState( false );

  const {isAuth} = useContext( UserContext );

  const {t} = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen( !isMenuOpen );
  };

  return (
    <>
      {/* Top Navbar */}
      <TopNav />

      <nav className="top-0 z-20 sticky bg-app/80 backdrop-blur-lg">
        <div className="custom-container">
          <div className="flex justify-between items-center h-16">
            <div className='flex gap-3 w-full'>
              {/* Logo */}
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-gray-800 text-2xl"><Logo /> </h1>
              </div>

              {/* Categories */}
              <Categories />

              {/* Search Bar - Hidden on mobile */}
              <div className="hidden lg:flex flex-1 mx-8 max-w-md">
                <Search />
              </div>
            </div>

            <div className={`flex ${ isAuth && "flex-row-reverse" }  items-center gap-3`}>

              {/* Desktop Action Buttons */}
              {isAuth ?
                <div className='flex items-center gap-4'>
                  <NotificationDropdown />
                  <UserDropdown />
                </div> :
                <div className="hidden lg:flex justify-end items-center space-x-4 min-w-60">
                  <Button title={t( "login" )} link="/login" outline="true" />
                  <Button title={t( "sing up for free" )} link="/register" />
                </div>
              }

              {/* Mobile Menu Button */}

              {!isAuth ?
                <div className="lg:hidden">
                  <button
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    className="relative mt-1 p-2 rounded-md focus:outline-none focus:ring-blue-500 text-blue-500 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                  >
                    <div className="relative w-6 h-6">
                      {/* Top line */}
                      <span
                        className={`absolute top-0 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${ isMenuOpen ? 'rotate-45 translate-y-2' : ''
                          }`}
                      />
                      {/* Middle line */}
                      <span
                        className={`absolute top-2 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${ isMenuOpen ? 'opacity-0' : ''
                          }`}
                      />
                      {/* Bottom line */}
                      <span
                        className={`absolute top-4 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${ isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                          }`}
                      />
                    </div>
                  </button>
                </div>
                :
                !isMenuOpen &&
                <button
                  onClick={toggleMenu}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  className="lg:hidden dark:bg-gray-900 dark:hover:bg-gray-800 p-1 border dark:hover:border border-app hover:border-blue-500 dark:border-gray-900 rounded-full focus:outline-none focus:ring-blue-500 text-gray-500 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                >
                  <BiSearch className='text-2xl' />

                </button>
              }
            </div>
          </div>

          {/* Mobile Menu - Grid Version */}
          <div
            className={`transition-all lg:hidden duration-500 ease-in-out ${ isMenuOpen
              ? 'overflow-visible opacity-100 max-h-96'
              : 'overflow-hidden opacity-0 max-h-0'
              }`}
          >
            <div className="space-y-4 bg-white dark:bg-gray-800 px-4 pt-4 pb-3 border-gray-200 dark:border-gray-700 border-t">
              {/* Mobile Search */}
              <div className="flex items-center gap-2 px-1">
                <Search />
                {isAuth &&
                  <button
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    className="dark:bg-gray-900 dark:hover:bg-gray-800 p-1 border dark:hover:border border-app hover:border-blue-500 dark:border-gray-900 rounded-full focus:outline-none focus:ring-blue-500 text-app-color hover:text-blue-600 transition-all duration-200 cursor-pointer"
                  >
                    <IoCloseOutline className='text-2xl' />
                  </button>
                }
              </div>

              {/* Mobile Action Buttons */}
              {!isAuth && (
                <div className="flex flex-col gap-3 px-1">
                  <Button
                    title={t( "login" )}
                    link="/login"
                    outline={true}
                    fullWidth
                    className="justify-center py-2.5"
                  />
                  <Button
                    title={t( "Join for Free" )}
                    link="/register"
                    fullWidth
                    className="justify-center py-2.5"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav >
    </>
  );
};

export default NavBar;
