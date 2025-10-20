import React, {useState, useEffect, useRef, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {IoSearchOutline} from "react-icons/io5";
import {useNavigate, useSearchParams} from "react-router";
import api from "../utils/api";

export default function Search() {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const [ query, setQuery ] = useState( "" );
  const [ results, setResults ] = useState( [] );
  const [ loading, setLoading ] = useState( false );
  const [ showDropdown, setShowDropdown ] = useState( false );
  const [ activeIndex, setActiveIndex ] = useState( -1 );
  const [ error, setError ] = useState( null );

  const wrapperRef = useRef( null );
  const inputRef = useRef( null );
  const debounceRef = useRef( null );

  const [ params ] = useSearchParams();
  const search = params.get( "search" ) || "";

  // Close dropdown on outside click
  useEffect( () => {
    function handleClickOutside( e ) {
      if ( wrapperRef.current && !wrapperRef.current.contains( e.target ) ) {
        setShowDropdown( false );
        setActiveIndex( -1 );
      }
    }
    document.addEventListener( "mousedown", handleClickOutside );
    return () => document.removeEventListener( "mousedown", handleClickOutside );
  }, [] );

  // Sync input value with URL param WITHOUT fetching
  useEffect( () => {
    setQuery( search || "" );
    // Do not fetch here; dropdown stays hidden until user types
    setResults( [] );
    setShowDropdown( false );
    setActiveIndex( -1 );
    setLoading( false );
    setError( null );
  }, [ search ] );

  // Debounced fetch (calls /courses?search=...)
  useEffect( () => {
    if ( !query || query.trim().length < 1 ) {
      setResults( [] );
      setLoading( false );
      return;
    }

    clearTimeout( debounceRef.current );

    debounceRef.current = setTimeout( async () => {
      try {
        setLoading( true );
        const res = await api.get( `/courses?search=${ encodeURIComponent( query ) }` );
        // Expect res.data.data = [{ id, title, categoryName, platform, price }, ...]
        setResults( res?.data?.data || [] );
      } catch ( err ) {
        setError(
          err.response?.data?.message ||
          err.message ||
          t( "searchCourses.fetchError" )
        );
        setResults( [] );
      } finally {
        setLoading( false );
      }
    }, 350 );

    return () => clearTimeout( debounceRef.current );
  }, [ query ] );

  const onSubmit = ( e ) => {
    e.preventDefault();
    if ( !query.trim() ) return;
    navigate( `/courses?search=${ encodeURIComponent( query ) }` );
    setShowDropdown( false );
    setActiveIndex( -1 );
  };

  const onSelect = useCallback(
    ( course ) => {
      navigate( `/courses/${ course.id }` );
      setQuery( "" );
      setShowDropdown( false );
      setActiveIndex( -1 );
    },
    [ navigate ]
  );

  const onKeyDown = ( e ) => {
    if ( !showDropdown ) return;
    const len = results.length;
    if ( e.key === "ArrowDown" ) {
      e.preventDefault();
      setActiveIndex( ( i ) => ( i + 1 + len ) % len );
    } else if ( e.key === "ArrowUp" ) {
      e.preventDefault();
      setActiveIndex( ( i ) => ( i - 1 + len ) % len );
    } else if ( e.key === "Enter" ) {
      if ( activeIndex >= 0 && activeIndex < len ) {
        e.preventDefault();
        onSelect( results[ activeIndex ] );
      }
    } else if ( e.key === "Escape" ) {
      setShowDropdown( false );
      setActiveIndex( -1 );
    }
  };

  return (
    <div ref={wrapperRef} className="relative mx-auto w-full lg:max-w-lg">
      <form role="search" aria-label={t( "searchCourses.ariaLabel" )} onSubmit={onSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={( e ) => {
              setQuery( e.target.value );
              setShowDropdown( true );
              setActiveIndex( -1 );
            }}
            onKeyDown={onKeyDown}
            placeholder={t( "searchCourses.placeholder" )}
            aria-controls="search-results"
            aria-expanded={showDropdown}
            aria-activedescendant={activeIndex >= 0 ? `option-${ results[ activeIndex ]?.id }` : undefined}
            className="bg-white dark:bg-gray-900 py-2 ps-5 pe-12 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-gray-100 text-sm transition placeholder-gray-400 dark:placeholder-gray-500"
          />

          <button
            type="submit"
            aria-label={t( "searchCourses.submit" )}
            className="top-1/2 absolute flex justify-center items-center bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-full w-8 h-8 text-white transition-colors -translate-y-1/2 transform end-1"
          >

            {loading ? (
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  d="M22 12a10 10 0 00-10-10"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="opacity-75"
                />
              </svg>
            ) : (
              <IoSearchOutline className="text-xl" />
            )}
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <ul
          id="search-results"
          role="listbox"
          className="z-80 absolute bg-white dark:bg-gray-800 shadow-lg mt-2 border border-gray-200 dark:border-gray-700 rounded-lg w-full max-h-72 overflow-auto"
        >
          {loading && (
            <li className="flex items-center px-4 py-3 text-gray-500 dark:text-gray-400">
              <svg className="mr-2 w-4 h-4 text-gray-500 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              {t( "searchCourses.loading" )}
            </li>
          )}

          {!loading && results.length === 0 && query.trim() !== "" && (
            <li
              role="status"
              aria-live="polite"
              className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center"
            >
              {t( "searchCourses.noResults", {query: query} )}
            </li>
          )}

          {!loading && query.trim() !== "" && results.length > 0 && (
            <>
              {results.map( ( course, idx ) => (
                <li
                  id={`result-${ idx }`}
                  key={course.id}
                  role="option"
                  aria-selected={activeIndex === idx}
                  onMouseEnter={() => setActiveIndex( idx )}
                  onClick={() => onSelect( course )}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 ${ activeIndex === idx ? 'bg-gray-50 dark:bg-gray-700' : ''
                    }`}
                >
                  <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md w-7 h-7 overflow-hidden">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="p-2 w-full h-full text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 6v6l4 2"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                        {course.title}
                      </p>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                      {course.categoryName ?? course.platform ?? t( "searchCourses.unknown" )}
                    </p>
                  </div>
                </li>
              ) )}
            </>
          )}

          {!loading && query.trim() === "" && results.length === 0 && (
            <li className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">
              {t( "searchCourses.startTyping" )}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}