import React, {useEffect, useMemo, useRef, useState, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {Link, useSearchParams} from "react-router";
import {TbFilterSearch} from "react-icons/tb";

import api from "../utils/api";
import DropDown from "../components/DropDown";
import DropDownFilter from "../components/DropDownFilter";
import Button from "../components/Button";
import CourseCards from "../components/courseCards";
import MobileFilterDropdown from "../components/MobileFilterDropdown";
import CourseCardSkeleton from "../components/CourseCardSkeleton";

const PAGE_SIZE = 10;

const Pagination = ( {currentPage, totalPages, onChange, loading} ) => {
  if ( !totalPages || totalPages <= 1 ) return null;

  const createRange = ( start, end ) => Array.from( {length: end - start + 1}, ( _, i ) => start + i );
  const pageNumbers = ( () => {
    if ( totalPages <= 7 ) return createRange( 1, totalPages );
    const left = Math.max( 1, currentPage - 3 );
    const right = Math.min( totalPages, currentPage + 3 );
    if ( left === 1 ) return createRange( 1, 7 );
    if ( right === totalPages ) return createRange( totalPages - 6, totalPages );
    return createRange( left, right );
  } )();

  const PageButton = ( {page} ) => (
    <button
      onClick={() => !loading && onChange( page )}
      disabled={loading}
      aria-current={currentPage === page ? "page" : undefined}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${ currentPage === page
        ? "bg-indigo-600 text-white shadow"
        : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
        } border border-gray-200 dark:border-gray-700 ${ loading ? 'opacity-50 cursor-not-allowed' : '' }`}
    >
      {page}
    </button>
  );

  return (
    <nav className="flex justify-center items-center gap-2" aria-label="Pagination">
      <button
        onClick={() => !loading && onChange( Math.max( 1, currentPage - 1 ) )}
        disabled={currentPage === 1 || loading}
        className="bg-white hover:bg-gray-50 dark:bg-gray-800 disabled:opacity-50 shadow-sm px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-sm disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {pageNumbers[ 0 ] > 1 && (
        <>
          <PageButton page={1} />
          {pageNumbers[ 0 ] > 2 && <span className="px-2">…</span>}
        </>
      )}

      {pageNumbers.map( ( p ) => (
        <PageButton key={p} page={p} />
      ) )}

      {pageNumbers[ pageNumbers.length - 1 ] < totalPages && (
        <>
          {pageNumbers[ pageNumbers.length - 1 ] < totalPages - 1 && <span className="px-2">…</span>}
          <PageButton page={totalPages} />
        </>
      )}

      <button
        onClick={() => !loading && onChange( Math.min( totalPages, currentPage + 1 ) )}
        disabled={currentPage === totalPages || loading}
        className="bg-white hover:bg-gray-50 dark:bg-gray-800 disabled:opacity-50 shadow-sm px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-sm disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
};

const Courses = () => {
  const [ courses, setCourses ] = useState( [] );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState( "" );
  const [ platformFilter, setPlatformFilter ] = useState( "All Platform" );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ totalItems, setTotalItems ] = useState( 0 );
  const [ totalPages, setTotalPages ] = useState( 0 );

  const [ isFilterOpen, setIsFilterOpen ] = useState( false );

  const {t} = useTranslation();
  const [ searchParams, setSearchParams ] = useSearchParams();
  const search = searchParams.get( "search" ) || "";
  const mainRef = useRef( null );

  // ✅ Read filters from URL on mount & whenever URL changes
  useEffect( () => {
    const page = parseInt( searchParams.get( "page" ) ) || 1;

    setCurrentPage( page );
  }, [ searchParams ] );

  // ✅ Handle checkbox change
  const handleCheckboxChange = useCallback( ( filterName, value, checked ) => {
    setSearchParams( prev => {
      const params = new URLSearchParams( prev );
      const currentValues = params.getAll( filterName );

      if ( checked ) {
        // Add value if not already present
        if ( !currentValues.includes( value.toLowerCase() ) ) {
          params.append( filterName, value.toLowerCase() );
        }
      } else {
        // Remove value
        params.delete( filterName );
        currentValues
          .filter( v => v !== value.toLowerCase() )
          .forEach( v => params.append( filterName, v ) );
      }

      // Reset to page 1 when filters change
      params.set( 'page', '1' );
      return params;
    } );
  }, [ setSearchParams ] );

  // ✅ Get current filters from URL
  const currentFilters = useMemo( () => {
    return {
      category: searchParams.getAll( "category" ),
      price: searchParams.getAll( "price" ),
    };
  }, [ searchParams ] );

  // ✅ Fetch data with pagination
  const fetchCourses = useCallback( async () => {
    let canceled = false;
    setLoading( true );
    setError( "" );

    try {
      const params = {
        page: currentPage,
        per_page: PAGE_SIZE,
      };

      if ( search ) params.search = search;

      currentFilters.category.forEach( v => {
        if ( !params.category ) params.category = [];
        params.category.push( v );
      } );

      currentFilters.price.forEach( v => {
        if ( !params.price ) params.price = [];
        params.price.push( v );
      } );

      // Convert arrays to comma-separated strings for Laravel
      if ( Array.isArray( params.category ) ) {
        params.category = params.category.join( ',' );
      }
      if ( Array.isArray( params.price ) ) {
        params.price = params.price.join( ',' );
      }

      const response = await api.get( "/courses", {params} );

      if ( canceled ) return;

      const data = Array.isArray( response.data.data ) ? response.data.data : [];

      setCourses( data );
      setTotalItems( response.data.total || response.data.meta?.total || 0 );
      setTotalPages( response.data.last_page || response.data.meta?.last_page || 1 );
      setLoading( false );
    } catch ( err ) {
      if ( canceled ) return;
      console.error( "Failed to load courses:", err );
      setError( "Failed to load courses. Please try again later." );
      setLoading( false );
    }

    return () => {
      canceled = true;
    };
  }, [ currentPage, search, currentFilters ] );

  // ✅ Fetch courses when page, search, or filters change
  useEffect( () => {
    fetchCourses();
  }, [ fetchCourses ] );

  // ✅ Update URL when page changes
  useEffect( () => {
    setSearchParams( prev => {
      const params = new URLSearchParams( prev );
      params.set( 'page', currentPage.toString() );
      return params;
    } );
  }, [ currentPage, setSearchParams ] );

  // ✅ Platform filtering (client-side)
  const filteredCourses = useMemo( () => {
    if ( platformFilter === "All Platform" ) {
      return courses;
    }
    return courses.filter(
      ( c ) => String( c.platform || "" ).toLowerCase() === platformFilter.toLowerCase()
    );
  }, [ platformFilter, courses ] );

  const pageStart = ( currentPage - 1 ) * PAGE_SIZE;
  const currentItems = filteredCourses;

  const platforms = useMemo( () => {
    const map = new Map();
    // This would ideally come from the API, but we'll derive it from current courses
    for ( const course of courses ) {
      const platform = course.platform || "Unnamed";
      if ( !map.has( platform ) ) map.set( platform, {label: platform, value: platform} );
    }
    return [ {label: t( "All Platform" ), value: "All Platform"}, ...map.values() ];
  }, [ courses, t ] );

  const categories = useMemo( () => {
    const map = new Map();
    // This would ideally come from the API
    for ( const course of courses ) {
      const category = course.categoryName || "Unnamed";
      if ( !map.has( category ) ) {
        map.set( category, category );
      }
    }
    return Array.from( map.values() );
  }, [ courses ] );

  const priceCourses = useMemo( () => {
    const result = [];
    const hasFree = courses.some( c => Number( c.price ) === 0 );
    const hasPaid = courses.some( c => Number( c.price ) > 0 );

    if ( hasPaid ) result.push( "paid" );
    if ( hasFree ) result.push( "free" );

    return result;
  }, [ courses ] );

  const handlePageChange = ( page ) => {
    if ( loading ) return;

    setCurrentPage( Math.max( 1, Math.min( totalPages, page ) ) );
    mainRef.current?.scrollIntoView( {behavior: "smooth", block: "start"} );
  };

  const smoothScrollToTop = ( e ) => {
    // Smooth scroll to top of page
    window.scrollTo( {
      top: 0,
      left: 0,
      behavior: "smooth"
    } );
  };

  return (
    <div className="md:mt-6">
      <div className="grid md:grid-cols-4 bg-app my-4 px-6 md:py-10 text-gray-900 dark:text-gray-100 transition-colors custom-container">
        {/* Sidebar Filters */}
        <aside className="hidden md:flex flex-col gap-6 col-span-1 pb-10">
          <span className="flex justify-between items-center bg-blue-100 px-6 py-2 rounded-full text-blue-500">
            <p className="font-medium">{t( "Filter" )}</p>
            <TbFilterSearch className="text-xl" />
          </span>

          <div className="p-2">
            <DropDownFilter
              items={priceCourses}
              title="Price"
              isOpen={true}
              filters={currentFilters}
              handleCheckboxChange={handleCheckboxChange}
            />
            <DropDownFilter
              items={categories}
              title="Category"
              isOpen={true}
              filters={currentFilters}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>

          {/* Hurry! Sale Ends */}
          <div className="hidden md:block bg-blue-100 p-11 rounded-lg text-center">
            <h4 className="max-w-md font-bold text-gray-700 text-3xl">
              Get 50% Off Development Courses!
            </h4>
            <p className="mt-2 font-medium text-gray-600">
              Hurry! Sale Ends in 2 Days
            </p>
            <div className="flex mt-10">
              <Button classSize="w-full" link="#" title="Start Today" />
            </div>
          </div>

          {/* Become an Instructor */}
          <div className="hidden md:block bg-[url(/inst.png)] p-11 rounded-lg">
            <h4 className="max-w-md font-bold text-white text-3xl">
              Share your expertise and earn extra income
            </h4>
            <p className="mt-2 font-medium text-white">
              Share your knowledge and inspire the next generation of learners.
            </p>
            <div className="mt-10">
              <Button classSize="w-full" link="#" title="Become an Instructor" />
            </div>
          </div>
        </aside>

        {/* Main */}
        <main ref={mainRef} className="col-span-3 md:mx-auto md:px-6 pb-8 w-full">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 mb-6 pb-3 border-gray-300 dark:border-gray-700 border-b w-full">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <strong>{totalItems}</strong> results
            </p>
            <div className="min-w-30">
              {isFilterOpen && (
                <MobileFilterDropdown
                  onClose={() => setIsFilterOpen( false )}
                >
                  <DropDownFilter
                    items={priceCourses}
                    title="Price"
                    isOpen={true}
                    filters={currentFilters}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                  <DropDownFilter
                    items={categories}
                    title="Category"
                    isOpen={true}
                    filters={currentFilters}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                </MobileFilterDropdown>
              )}
              <div className="flex gap-2">
                <button
                  className="md:hidden hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer"
                  onClick={() => setIsFilterOpen( true )}
                >
                  <TbFilterSearch className="text-xl" />
                </button>
                <DropDown value={platformFilter} onChange={setPlatformFilter} options={platforms} />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
              <CourseCardSkeleton count={PAGE_SIZE} />
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/30 p-6 border border-red-200 dark:border-red-700 rounded-lg text-red-700">
              {error}
            </div>
          ) : (
            <>
              <div className="gap-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {currentItems.length ? (
                  currentItems.map( ( course ) =>
                    <Link to={`/courses/${ course.id }`} onClick={smoothScrollToTop} >
                      <CourseCards key={course.id} course={course} />
                    </Link>
                  )
                ) : (
                  <div className="col-span-full p-8 border border-gray-300 dark:border-gray-700 border-dashed rounded-lg text-gray-600 dark:text-gray-400 text-center">
                    No courses match your filters.
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-4 mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onChange={handlePageChange}
                  loading={loading}
                />
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Showing {Math.min( totalItems, pageStart + 1 )}–
                  {Math.min( totalItems, pageStart + currentItems.length )} of {totalItems}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Courses;