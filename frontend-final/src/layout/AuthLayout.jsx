import {Outlet, Link} from 'react-router'; // ✅ use `react-router-dom`
import LanguageSelector from '../components/LanguageSelector';
import {useTranslation} from 'react-i18next';
import BtnTheme from '../components/BtnTheme';
import ImageGrid from '../components/ImageGrid';
import {TbHome} from "react-icons/tb";

function AuthLayout() {
  const {t} = useTranslation();

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-gray-50 dark:from-gray-900 to-gray-100 dark:to-gray-800 px-4 sm:px-6 lg:px-8 h-[100vh] transition-all duration-700">
      <div className="relative mx-auto w-full max-w-6xl">
        {/* Navigation Bar */}
        <nav className="top-2 z-10 absolute flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm p-2 rounded-full end-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 font-medium text-gray-700 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-200 transition-colors duration-200"
          >
            <TbHome className="text-xl" aria-hidden="true" />
            <span className="text-sm">{t( "home" )}</span>
          </Link>
          <div className="bg-gray-300 dark:bg-gray-600 w-px h-4" role="separator" />
          <BtnTheme />
          <div className="bg-gray-300 dark:bg-gray-600 w-px h-4" role="separator" />
          <LanguageSelector />
        </nav>

        {/* Main Container */}
        <div className="relative flex bg-app dark:bg-gray-800 shadow-2xl rounded-2xl min-h-138 overflow-hidden">
          {/* Left Side - Hero Image */}
          <div className="hidden relative lg:flex lg:w-1/2">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800/90 mix-blend-multiply" />
              <ImageGrid />
            </div>

            <div className="relative flex h-full">
              <div className="flex items-center bg-black/50 px-15 w-full h-full text-center">
                <h1 className="mb-6 font-extrabold text-4xl md:text-5xl leading-tight tracking-tight">
                  <span className="inline-block relative bg-[length:200%_auto] hover:bg-[center_right_1rem] bg-clip-text bg-gradient-to-r from-white via-gray-400/85 to-white text-transparent hover:scale-105 transition-all animate-gradient duration-300 transform">
                    <span className="absolute inset-0 animate-pulse">
                      <span>{t( "login text" )}</span>
                    </span>
                    {t( "login text" )}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="bg-app px-4 sm:px-6 lg:px-8 py-15 w-full lg:w-1/2">
            <div className="mx-auto w-full max-w-md max-h-[80vh]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;