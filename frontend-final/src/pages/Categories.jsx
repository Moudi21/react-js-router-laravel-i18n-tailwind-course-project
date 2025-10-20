import React, {useState, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import api from '../utils/api';
import {FaEdit, FaTrash} from 'react-icons/fa';
import {useTranslation} from 'react-i18next';
import LoadingButton from '../components/LoadingButton';
import Dropdown from '../components/DropDown';

export default function Categories() {
  const {t} = useTranslation();
  const [ categories, setCategories ] = useState( [] );
  const [ editId, setEditId ] = useState( null );
  const [ loading, setLoading ] = useState( false );
  const [ selectCategory, setSelectCategory ] = useState( false );
  const [ error, setError ] = useState( null );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm( {
    defaultValues: {
      name: '',
      parentId: '',
      mediaPath: '',
    },
  } );

  useEffect( () => {
    fetchCategories();
  }, [] );

  const fetchCategories = async () => {
    setLoading( true );
    setError( null );
    try {
      const res = await api.get( '/category' );
      setCategories( res.data );
    } catch ( err ) {
      console.error( 'Error fetching categories:', err );
      setError( t( 'fetchCategoriesError' ) || 'Failed to load categories.' );
    } finally {
      setLoading( false );
    }
  };

  const onSubmit = async ( data ) => {
    setLoading( true );
    setError( null );

    const payload = {
      name: data.name.trim(),
      parentId: data.parentId || null,
      mediaPath: data.mediaPath.trim(),
    };

    try {
      if ( editId ) {
        await api.put( `/category/${ editId }`, payload );
      } else {
        await api.post( '/category', payload );
      }
      resetForm();
      setSelectCategory( false );
      await fetchCategories();
    } catch ( err ) {
      console.error( 'API error:', err );
      setError( t( 'saveCategoryError' ) || 'Failed to save category.' );
    } finally {
      setLoading( false );
    }
  };

  const resetForm = () => {
    reset(); // reset react-hook-form
    setEditId( null );
  };

  const handleEdit = ( category ) => {
    setValue( 'name', category.name || '' );
    setValue( 'parentId', category.parentId || '' );
    setValue( 'mediaPath', category.mediaPath || '' );
    setEditId( category.id );
  };

  const handleDelete = async ( id ) => {
    if ( window.confirm( t( 'confirmDeleteCategory' ) || 'Are you sure you want to delete this category?' ) ) {
      setLoading( true );
      setError( null );
      try {
        await api.delete( `/category/${ id }` );
        await fetchCategories();
      } catch ( err ) {
        console.error( 'Error deleting category:', err );
        setError( t( 'deleteCategoryError' ) || 'Failed to delete category.' );
      } finally {
        setLoading( false );
      }
    }
  };

  const isImagePath = ( path ) =>
    typeof path === 'string' &&
    ( path.endsWith( '.png' ) ||
      path.endsWith( '.jpg' ) ||
      path.endsWith( '.jpeg' ) ||
      path.endsWith( '.gif' ) ||
      path.startsWith( 'http' ) );

  const parentOptions = useMemo( () => {
    const map = new Map();

    for ( const category of categories ) {
      const name = category.name || 'Unnamed';

      if ( !map.has( name ) ) {
        map.set( name, {
          label: name,
          value: category.id,
        } );
      }
    }

    return [ {label: t( 'Clear Parent' ), value: ''}, ...Array.from( map.values() ) ];
  }, [ categories, t ] );

  return (
    <div className="bg-white dark:bg-gray-900 p-6 w-full min-h-screen text-black dark:text-white">
      <h1 className="mb-6 font-bold text-2xl">{t( 'categoryManager' )}</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
        {/* Left Form */}
        <form
          onSubmit={handleSubmit( onSubmit )}
          className="col-span-1 bg-gray-100 dark:bg-gray-800 shadow p-4 rounded"
        >
          <h2 className="mb-4 font-semibold text-xl">
            {editId ? t( 'editCategory' ) : t( 'addCategory' )}
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'name' )}</label>
            <input
              type="text"
              className="input-field"
              placeholder={t( 'enterCategoryName' )}
              {...register( 'name', {required: t( 'validation.required' )} )}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Parent Dropdown */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'parentCategory' )}</label>
            <Dropdown
              value={selectCategory}
              onChange={( val ) => ( setValue( 'parentId', val ), setSelectCategory( val ) )}
              options={parentOptions}
            />
          </div>

          {/* Media Path */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'mediaPath' )}</label>
            <input
              type="text"
              className="input-field"
              placeholder={t( 'enterIconOrUrl' )}
              {...register( 'mediaPath' )}
            />
          </div>

          <div className="flex space-x-2">
            <LoadingButton
              type="submit"
              loading={loading}
              className="bg-primary-500 hover:bg-primary-600 disabled:opacity-70 py-2 border border-primary-500 rounded-lg w-40 text-white text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed transform"
            >
              {editId ? t( 'update' ) : t( 'add' )}
            </LoadingButton>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg w-40 text-white"
              >
                {t( 'cancel' )}
              </button>
            )}
          </div>
        </form>

        {/* Right Table */}
        <div className="col-span-1 md:col-span-2 bg-gray-100 dark:bg-gray-800 shadow p-4 rounded overflow-x-auto">
          <h2 className="mb-4 font-semibold text-xl">{t( 'categories' )}</h2>

          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border">{t( 'media' )}</th>
                <th className="p-2 border">{t( 'category' )}</th>
                <th className="p-2 border">{t( 'parent' )}</th>
                <th className="p-2 border">{t( 'actions' )}</th>
              </tr>
            </thead>
            <tbody>
              {categories
                .filter( ( cat ) => !cat.parentId )
                .map( ( cat ) => (
                  <React.Fragment key={cat.id}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-2 border text-center">
                        {cat.mediaPath ? (
                          isImagePath( cat.mediaPath ) ? (
                            <img src={cat.mediaPath} alt="icon" className="mx-auto w-6 h-6" />
                          ) : (
                            <span className="text-xl">{cat.mediaPath}</span>
                          )
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="p-2 border font-semibold">{cat.name}</td>
                      <td className="p-2 border">—</td>
                      <td className="space-x-2 p-2 border text-center">
                        <button
                          onClick={() => handleEdit( cat )}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete( cat.id )}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>

                    {cat.children?.map( ( child ) => (
                      <tr key={child.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-2 border text-center">
                          {child.mediaPath ? (
                            isImagePath( child.mediaPath ) ? (
                              <img src={child.mediaPath} alt="icon" className="mx-auto w-6 h-6" />
                            ) : (
                              <span className="text-xs">{child.mediaPath}</span>
                            )
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="p-2 pl-8 border">↳ {child.name}</td>
                        <td className="p-2 border">{cat.name}</td>
                        <td className="space-x-2 p-2 border text-center">
                          <button
                            onClick={() => handleEdit( child )}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete( child.id )}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ) )}
                  </React.Fragment>
                ) )}

              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-gray-500 text-center">
                    {t( 'noCategories' )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
