import React, {useEffect, useState} from 'react';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import api from '../utils/api';
import CourseCards from './courseCards';
import CourseCardSkeleton from './CourseCardSkeleton';
import {Link} from 'react-router';

const responsive = {
  superLargeDesktop: {breakpoint: {max: 4000, min: 1280}, items: 4},
  desktop: {breakpoint: {max: 1280, min: 1024}, items: 4},
  tablet: {breakpoint: {max: 1024, min: 768}, items: 3},
  mobile: {breakpoint: {max: 768, min: 0}, items: 2},
};

const CustomArrow = ( {onClick, direction} ) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md transition duration-300 cursor-pointer ${ direction === 'left' ? 'left-2' : 'right-2'
      }`}
  >
    {direction === 'left' ? <FaArrowLeft /> : <FaArrowRight />}
  </button>
);


const TrendingCourses = () => {
  const [ courses, setCourses ] = useState( [] );
  const [ loading, setLoading ] = useState( true );

  useEffect( () => {
    const fetchCourses = async () => {
      try {
        const response = await api.get( '/courses' );
        const coursesData = Array.isArray( response.data?.data ) ? response.data.data : [];
        setCourses( coursesData );
      } catch ( error ) {
        console.error( 'Failed to fetch courses:', error );
      } finally {
        setLoading( false );
      }
    };

    fetchCourses();
  }, [] );

  if ( loading ) {
    return (
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 custom-container">
        <CourseCardSkeleton count={4} />
      </div>

    );
  }

  const smoothScrollToTop = ( e ) => {
    // Smooth scroll to top of page
    window.scrollTo( {
      top: 0,
      left: 0,
      behavior: "smooth"
    } );
  };

  return (
    <section className="my-15 p-4 lg:px-12 custom-container">
      <h1 className="mb-2 font-semibold text-gray-700 dark:text-gray-200 text-3xl">
        Trending Courses Across Diverse Fields
      </h1>
      <p className="mb-4 font-medium text-gray-600 dark:text-gray-400 text-lg">
        Handpicked courses across various categories to help you achieve your learning goals
      </p>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        arrows
        showDots={false}
        pauseOnHover
        itemClass="px-2 py-3"
        customLeftArrow={<CustomArrow direction="left" />}
        customRightArrow={<CustomArrow direction="right" />}
      >

        {courses.length === 0 ? (
          <div className="py-10 text-gray-500 text-center">
            No courses available
          </div>
        ) : (
          courses.map( course => (
            <Link to={`/courses/${ course.id }`} onClick={smoothScrollToTop}>
              <CourseCards key={course.id} course={course} />
            </Link>
          ) )
        )}
      </Carousel>

    </section>
  );
};

export default TrendingCourses;