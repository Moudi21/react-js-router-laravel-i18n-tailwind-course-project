import React, {useState, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import api from '../utils/api';
import {FaEdit, FaTrash, FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {useTranslation} from 'react-i18next';
import LoadingButton from '../components/LoadingButton';
import Dropdown from '../components/DropDown';

export default function Courses() {
  const {t} = useTranslation();
  const [ courses, setCourses ] = useState( [] );
  const [ categories, setCategories ] = useState( [] );
  const [ editId, setEditId ] = useState( null );
  const [ loading, setLoading ] = useState( false );
  const [ selectCategory, setSelectCategory ] = useState( '' );
  const [ error, setError ] = useState( null );
  const [ pagination, setPagination ] = useState( {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0
  } );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm( {
    defaultValues: {
      title: '',
      provider: '',
      date: '',
      users: 0,
      rating: 0,
      image: '',
      link: '',
      categoryName: '',
      platform: '',
      disc: '',
      price: '0.00',
      isActive: false,
    },
  } );

  useEffect( () => {
    fetchCourses();
    fetchCategories();
  }, [] );

  const fetchCourses = async ( page = 1 ) => {
    setLoading( true );
    setError( null );
    try {
      const res = await api.get( `/courses?page=${ page }` );
      setCourses( res.data.data || [] );
      setPagination( {
        current_page: res.data.current_page || 1,
        last_page: res.data.last_page || 1,
        per_page: res.data.per_page || 10,
        total: res.data.total || 0,
        from: res.data.from || 0,
        to: res.data.to || 0
      } );
    } catch ( err ) {
      console.error( 'Error fetching courses:', err );
      setError( t( 'fetchCoursesError' ) || 'Failed to load courses.' );
    } finally {
      setLoading( false );
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get( '/category' );
      setCategories( res.data || [] );
    } catch ( err ) {
      console.error( 'Error fetching categories:', err );
    }
  };

  const onSubmit = async ( data ) => {
    setLoading( true );
    setError( null );

    const payload = {
      title: data.title.trim(),
      provider: data.provider.trim(),
      date: data.date || null,
      users: Number( data.users ) || 0,
      rating: Number( data.rating ) || 0,
      image: data.image?.trim() || null,
      link: data.link?.trim() || null,
      categoryName: data.categoryName || null,
      platform: data.platform?.trim() || '',
      price: parseFloat( data.price ) || 0.0,
      disc: data.disc || null,
      isActive: !!data.isActive,
    };

    try {
      if ( editId ) {
        await api.put( `/courses/${ editId }`, payload );
      } else {
        await api.post( '/courses', payload );
      }
      resetForm();
      await fetchCourses( pagination.current_page ); // Refresh current page
    } catch ( err ) {
      console.error( 'API error:', err );
      setError( t( 'saveCourseError' ) || 'Failed to save course.' );
    } finally {
      setLoading( false );
    }
  };

  const resetForm = () => {
    reset();
    setEditId( null );
    setSelectCategory( '' );
  };

  const handleEdit = ( course ) => {
    setValue( 'title', course.title || '' );
    setValue( 'provider', course.provider || '' );
    setValue( 'date', course.date ? course.date.split( 'T' )[ 0 ] : '' );
    setValue( 'users', course.users || 0 );
    setValue( 'rating', course.rating || 0 );
    setValue( 'image', course.image || '' );
    setValue( 'link', course.link || '' );
    setValue( 'categoryName', course.categoryName || '' );
    setSelectCategory( course.categoryName || '' );
    setValue( 'platform', course.platform || '' );
    setValue( 'price', course.price?.toString() || '0.00' );
    setValue( 'isActive', !!course.isActive );
    setValue( 'disc', course.disc || '' );
    setEditId( course.id );
  };

  const handleDelete = async ( id ) => {
    if ( window.confirm( t( 'confirmDeleteCourse' ) || 'Are you sure you want to delete this course?' ) ) {
      setLoading( true );
      setError( null );
      try {
        await api.delete( `/courses/${ id }` );
        await fetchCourses( pagination.current_page ); // Refresh current page
      } catch ( err ) {
        console.error( 'Error deleting course:', err );
        setError( t( 'deleteCourseError' ) || 'Failed to delete course.' );
      } finally {
        setLoading( false );
      }
    }
  };

  const handlePageChange = ( page ) => {
    if ( page >= 1 && page <= pagination.last_page ) {
      fetchCourses( page );
    }
  };

  const isImagePath = ( path ) =>
    typeof path === 'string' && ( path.endsWith( '.png' ) || path.endsWith( '.jpg' ) || path.endsWith( '.jpeg' ) || path.endsWith( '.gif' ) || path.startsWith( 'http' ) );

  const categoryOptions = useMemo( () => {
    const opts = categories.flatMap( ( c ) => {
      if ( Array.isArray( c.children ) && c.children.length > 0 ) {
        return c.children.map( ( child ) => ( {
          label: child.name || "Unnamed",
          value: child.name,
        } ) );
      } else {
        return {
          label: c.name || "Unnamed",
          value: c.name,
        };
      }
    } );

    return [
      {label: t( "SelectCategory" ) || "Select category", value: ""},
      ...opts,
    ];
  }, [ categories, t ] );

  // Custom validation functions
  const validateImageUrl = ( url ) => {
    if ( !url ) return true;
    const pattern = /\.(jpg|jpeg|png|gif)$/i;
    return pattern.test( url ) || url.startsWith( 'http' );
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const {current_page, last_page} = pagination;

    // Always show first page
    pages.push( 1 );

    // Show pages around current page
    for ( let i = Math.max( 2, current_page - 1 ); i <= Math.min( last_page - 1, current_page + 1 ); i++ ) {
      if ( i > 1 && i < last_page ) {
        pages.push( i );
      }
    }

    // Always show last page if different from first
    if ( last_page > 1 ) {
      pages.push( last_page );
    }

    // Remove duplicates and sort
    return [ ...new Set( pages ) ].sort( ( a, b ) => a - b );
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 w-full min-h-screen text-black dark:text-white">
      <h1 className="mb-6 font-bold text-2xl">{t( 'courseManager' ) || 'Course Manager'}</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="gap-4 grid grid-cols-1 lg:grid-cols-4">
        <form onSubmit={handleSubmit( onSubmit )} className="col-span-1 bg-gray-100 dark:bg-gray-800 shadow p-4 rounded">
          <h2 className="mb-4 font-semibold text-xl">{editId ? t( 'editCourse' ) : t( 'addCourse' )}</h2>

          {/* Title */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'title' )}</label>
            <input
              className="input-field"
              {...register( 'title', {
                required: t( 'validation.required' ),
                minLength: {value: 3, message: t( 'validation.min', {count: 3} )},
              } )}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Categories */}
          <div className="mb-3">
            <label className="block mb-1">{t( 'category' )}</label>
            <Dropdown value={selectCategory} onChange={( val ) => ( setValue( 'categoryName', val ), setSelectCategory( val ) )} options={categoryOptions} />
          </div>

          {/* Provider */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'provider' )}</label>
            <input
              className="input-field"
              {...register( 'provider', {required: t( 'validation.required' )} )}
            />
            {errors.provider && <p className="text-red-500 text-sm">{errors.provider.message}</p>}
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'date' )}</label>
            <input
              type="date"
              className="input-field"
              {...register( 'date', {required: t( 'validation.required' )} )}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'price' )}</label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              {...register( 'price', {
                required: t( 'validation.required' ),
                valueAsNumber: true,
                min: {value: 0, message: t( 'validation.minValue', {count: 0} )},
              } )}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          {/* users */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'users' )}</label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              {...register( 'users', {
                required: t( 'validation.required' ),
                valueAsNumber: true,
                min: {value: 0, message: t( 'validation.minValue', {count: 0} )},
              } )}
            />
            {errors.users && <p className="text-red-500 text-sm">{errors.users.message}</p>}
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'rating' )}</label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              {...register( 'rating', {
                required: t( 'validation.required' ),
                valueAsNumber: true,
                min: {value: 0, message: t( 'validation.minValue', {count: 0} )},
              } )}
            />
            {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'image' )}</label>
            <input
              className="input-field"
              {...register( 'image', {
                validate: ( value ) =>
                  validateImageUrl( value ) || t( 'validation.invalidImageUrl' ),
              } )}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>

          {/* Link */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'link' )}</label>
            <input
              className="input-field"
              {...register( 'link' )}
            />
          </div>

          {/* platform */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'platform' )}</label>
            <input
              className="input-field"
              {...register( 'platform', {required: t( 'validation.required' )} )}
            />
            {errors.platform && <p className="text-red-500 text-sm">{errors.platform.message}</p>}
          </div>

          {/* description */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'description' )}</label>
            <textarea
              className="input-field"
              {...register( 'disc' )}
            />
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" {...register( 'isActive' )} />
              <span>{t( 'isActive' )}</span>
            </label>
          </div>

          <div className="flex space-x-2">
            <LoadingButton type="submit" loading={loading} className="bg-primary-500 hover:bg-primary-600 disabled:opacity-70 py-2 border border-primary-500 rounded-lg w-40 text-white text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed transform">
              {editId ? t( 'update' ) : t( 'add' )}
            </LoadingButton>

            {editId && (
              <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg w-40 text-white">
                {t( 'cancel' )}
              </button>
            )}
          </div>
        </form>

        <div className="col-span-1 lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl">{t( 'courses' ) || 'Courses'}</h2>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Showing {pagination.from} to {pagination.to} of {pagination.total} results
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {courses.length === 0 && !loading && (
              <div className="col-span-full bg-gray-100 dark:bg-gray-800 p-4 rounded text-gray-500 text-center">{t( 'noCourses' ) || 'No courses found.'}</div>
            )}

            {courses.map( ( course ) => (
              <div key={course.id} className="flex flex-col bg-gray-100 dark:bg-gray-800 shadow p-4 rounded">
                <div className="relative flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    {course.image ? (
                      isImagePath( course.image ) ? (
                        <img src={course.image} alt={course.title} className="rounded w-16 h-16 object-cover" />
                      ) : (
                        <div className="flex justify-center items-center bg-gray-200 rounded w-16 h-16 text-xs">{course.image}</div>
                      )
                    ) : (
                      <div className="flex justify-center items-center bg-gray-200 rounded w-16 h-16 text-xs">—</div>
                    )}
                  </div>
                  <div className="top-2 absolute flex items-center space-x-2 bg-gray-900 p-1 rounded-sm end-2">
                    <button onClick={() => handleEdit( course )} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                    <button onClick={() => handleDelete( course.id )} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                  </div>
                </div>
                <div className="flex-1 mt-3">
                  <div>
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{course.provider}</p>
                    <p className="text-gray-500 text-xs">{course.date ? new Date( course.date ).toLocaleDateString() : '—'}</p>
                  </div>
                  <p className="text-sm">{t( 'platform' )}: <span className="font-medium">{course.platform || '—'}</span></p>
                  <p className="text-sm">{t( 'users' )}: <span className="font-medium">{course.users ?? 0}</span></p>
                  <p className="text-sm">{t( 'price' )}: <span className="font-medium">{course.price != null ? Number( course.price ).toFixed( 2 ) : '0.00'}</span></p>
                  <p className="text-sm break-words">{course.link ? ( <a href={course.link} target="_blank" rel="noopener noreferrer" className="underline">{t( 'openLink' ) || 'Open'}</a> ) : '—'}</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className={`px-2 py-1 rounded text-xs ${ course.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>{course.isActive ? t( 'active' ) || 'Active' : t( 'inactive' ) || 'Inactive'}</span>
                  <span className="text-gray-500 text-xs">{course.categoryName || '—'}</span>
                </div>
              </div>
            ) )}
          </div>

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange( pagination.current_page - 1 )}
                disabled={pagination.current_page === 1}
                className="flex items-center bg-white hover:bg-gray-50 disabled:opacity-50 px-3 py-2 border border-gray-300 rounded-md font-medium text-gray-500 text-sm disabled:cursor-not-allowed"
              >
                <FaChevronLeft className="mr-1 w-4 h-4" />
                Previous
              </button>

              {generatePageNumbers().map( ( page, index, array ) => {
                const showEllipsis = index > 0 && page - array[ index - 1 ] > 1;
                return (
                  <React.Fragment key={page}>
                    {showEllipsis && (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange( page )}
                      className={`px-3 py-2 border text-sm font-medium rounded-md ${ pagination.current_page === page
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              } )}

              <button
                onClick={() => handlePageChange( pagination.current_page + 1 )}
                disabled={pagination.current_page === pagination.last_page}
                className="flex items-center bg-white hover:bg-gray-50 disabled:opacity-50 px-3 py-2 border border-gray-300 rounded-md font-medium text-gray-500 text-sm disabled:cursor-not-allowed"
              >
                Next
                <FaChevronRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}