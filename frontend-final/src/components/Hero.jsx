import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import Button from './Button';
import ImageGrid from '../components/ImageGrid';

const Hero = () => {

  const {t, i18n} = useTranslation();
  const [ currentLang ] = useState( i18n.language );

  const isRtl = currentLang === 'ar';

  // Effect to update document dir / lang
  useEffect( () => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [ currentLang, isRtl ] );


  return (
    <div className="z-10 flex bg-app overflow-hidden">
      <div className="custom-container">
        <div className="grid lg:grid-cols-2 h-[100vh] 2xl:h-[600px]">
          {/* Headline Section */}
          <div className="flex flex-col justify-center gap-5 space-x-6">
            <h1 className="font-bold text-app-color text-4xl md:text-5xl leading-tight">
              {t( 'master_skills' )}
              <span className="block text-blue-600">{t( 'expert_led_courses' )}</span>
            </h1>

            <p className="max-w-3xl text-gray-600 text-lg leading-relaxed">
              {t( 'heroDescriptions' )}
            </p>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-6">
                {/* images */}
                {[ 0, 1, 2, 3 ].map( ( idx ) => (
                  <img
                    key={idx}
                    src={`/users-icon.jpg`}
                    alt={t( 'join_with_us' ) + ` ${ idx + 1 }`}
                    className="shadow-md border-2 border-white rounded-full w-12 h-12"
                  />
                ) )}
                <span className="flex justify-center items-center bg-app shadow-md border-2 border-blue-500 rounded-full w-12 h-12 text-sm">
                  +25K
                </span>
              </div>
              <span className="text-gray-600 text-sm">{t( 'join_with_us' )}</span>
            </div>

            <div className="flex items-center gap-4">
              <Button title={t( 'start_certification' )} link="#" />
              <button className="text-gray-600 text-md hover:text-blue-700 underline underline-offset-4 transition duration-200">
                {t( 'browse_all_courses' )}
              </button>
            </div>
          </div>

          <ImageGrid />

        </div>
      </div>
    </div >
  );
};

export default Hero;
