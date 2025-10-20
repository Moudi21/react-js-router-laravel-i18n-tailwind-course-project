import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import api from '../utils/api';
import {Link} from 'react-router';

// Correct responsive configuration for react-multi-carousel
const responsive = {
  superLargeDesktop: {
    breakpoint: {max: 4000, min: 1280},
    items: 5,
  },
  desktop: {
    breakpoint: {max: 1280, min: 1024},
    items: 4,
  },
  tablet: {
    breakpoint: {max: 1024, min: 768},
    items: 3,
  },
  mobile: {
    breakpoint: {max: 768, min: 0},
    items: 2,
  },
};

const CustomArrow = ( {onClick, direction} ) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 ${ direction === 'left' ? 'left-2' : 'right-2' } z-10 bg-primary-500 hover:bg-primary-600 shadow-md p-2 rounded-full text-white transition -translate-y-1/2 duration-300 cursor-pointer`}
  >
    {direction === 'left' ? <FaArrowLeft /> : <FaArrowRight />}
  </button>
);

const CardSkeleton = ( {count = 4} ) => (
  <>
    {Array.from( {length: count} ).map( ( _, index ) => (
      <div key={index} className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg text-center animate-pulse">
        <div className="bg-gray-200 mx-auto mb-3 rounded-full w-12 h-12"></div>
        <div className="bg-gray-200 mx-auto rounded w-3/4 h-4"></div>
      </div>
    ) )}
  </>
);

const MobileCategories = () => {
  const {t} = useTranslation();
  const [ categories, setCategories ] = useState( [] );
  const [ activeCategory, setActiveCategory ] = useState( '' );
  const [ loading, setLoading ] = useState( true );

  useEffect( () => {
    const getCategories = async () => {
      try {
        const res = await api.get( '/category-courses' );
        setCategories( res.data );
        if ( res.data[ 0 ]?.name ) setActiveCategory( res.data[ 0 ].name );
      } catch ( error ) {
        console.error( 'Failed to fetch data:', error );
      } finally {
        setLoading( false );
      }
    };

    getCategories();
  }, [] );

  const activeCategoryData = categories.find( cat => cat.name === activeCategory );
  const hasSubcategories = activeCategoryData?.children?.length > 0;

  return (
    <section className="lg:hidden custom-container">
      <span className="font-semibold text-gray-600 dark:text-gray-200 text-lg">
        {t( 'categories.title' )}
      </span>

      {/* Categories Navigation */}
      <nav className="border-gray-200 dark:border-gray-700 border-b">
        {loading ? (
          <CardSkeleton count={5} />
        ) : (
          <Carousel
            responsive={responsive}
            arrows
            showDots={false}
            customLeftArrow={<CustomArrow direction="left" />}
            customRightArrow={<CustomArrow direction="right" />}
          >
            {categories.map( ( category ) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory( category.name )}
                className={`px-4 w-full py-3 mt-4 font-semibold text-sm cursor-pointer border-b-2 transition-all duration-300 ${ activeCategory === category.name
                  ? "text-blue-500 border-blue-500"
                  : "text-gray-500 dark:text-gray-200 border-transparent hover:text-blue-600 hover:border-blue-600"
                  }`}
              >
                {category.name}
              </button>
            ) )}
          </Carousel>
        )}
      </nav>

      {/* Subcategories */}
      <div className="mt-3">
        {loading ? (
          <div className="gap-2 grid grid-cols-3">
            <CardSkeleton count={4} />
          </div>
        ) : !hasSubcategories ? (
          <div className="py-10 text-gray-500 text-center">
            {t( 'categories.noSubcategories', {category: activeCategory} )}
          </div>
        ) : (
          <Carousel
            responsive={responsive}
            autoPlay
            autoPlaySpeed={3000}
            arrows
            showDots={false}
            pauseOnHover
            itemClass="px-2 py-4"
            customLeftArrow={<CustomArrow direction="left" />}
            customRightArrow={<CustomArrow direction="right" />}
          >
            {activeCategoryData.children.map( ( sub ) => (
              <Link to={`/courses?category=${ sub.name.toLowerCase() }`}>
                <div
                  key={sub.id}
                  className="bg-app shadow-sm hover:shadow-md mx-2 p-4 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 text-center hover:scale-105 transition-all duration-300 cursor-pointer dark:"
                >
                  <div className="mb-2 text-2xl">{sub.mediaPath}</div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{sub.name}</h3>
                </div>
              </Link>
            ) )}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default MobileCategories;