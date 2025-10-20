import React, {useState, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FaEdit, FaTrash} from 'react-icons/fa';
import api from '../utils/api';
import LoadingButton from '../components/LoadingButton';
import Dropdown from '../components/DropDown';

export default function PageData() {
  const {t} = useTranslation();

  const [ pageDataLists, setPageDataLists ] = useState( [] );
  const [ editId, setEditId ] = useState( null );
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( null );
  const [ searchTerm, setSearchTerm ] = useState( '' );
  const [ selectedType, setSelectedType ] = useState( '' );


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm( {
    defaultValues: {
      name: '',
      link: '',
      disc: '',
      type: '',
      mediaPath: '',
      isActive: false,
    },
  } );

  useEffect( () => {
    fetchPageData();
  }, [] );

  const fetchPageData = async () => {
    setLoading( true );
    setError( null );
    try {
      const res = await api.get( '/page-data?type=all' );
      setPageDataLists( res.data );
    } catch ( err ) {
      console.error( err );
      setError( t( 'fetchError' ) || 'Failed to fetch data' );
    } finally {
      setLoading( false );
    }
  };

  const onSubmit = async ( data ) => {
    setLoading( true );
    setError( null );

    try {
      if ( editId ) {
        console.log( data );

        await api.put( `/page-data/${ editId }`, data );
      } else {
        await api.post( '/page-data', data );
      }
      resetForm();
      await fetchPageData();
    } catch ( err ) {
      console.error( err );
      setError( t( 'saveError' ) || 'Failed to save' );
    } finally {
      setLoading( false );
    }
  };

  const resetForm = () => {
    reset();
    setEditId( null );
  };

  const handleEdit = ( item ) => {
    setEditId( item.id );
    setValue( 'name', item.name );
    setValue( 'link', item.link );
    setValue( 'disc', item.disc || '' );
    setValue( 'type', item.type );
    setValue( 'mediaPath', item.mediaPath || '' );
    setValue( 'isActive', !!item.isActive );
  };

  const handleDelete = async ( id ) => {
    if ( window.confirm( t( 'confirmDelete' ) || 'Are you sure you want to delete this item?' ) ) {
      setLoading( true );
      try {
        await api.delete( `/page-data/${ id }` );
        await fetchPageData();
      } catch ( err ) {
        console.error( err );
        setError( t( 'deleteError' ) || 'Failed to delete' );
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
      path.endsWith( '.webp' ) ||
      path.startsWith( 'http' ) );

  const typeOptions = useMemo( () => {
    const map = new Map();

    for ( const pageDataList of pageDataLists ) {
      const name = pageDataList.type || 'Unnamed';

      if ( !map.has( name ) ) {
        map.set( name, {
          label: name,
          value: name,
        } );
      }
    }

    return [ {label: t( 'allTypes' ), value: ''}, ...Array.from( map.values() ) ];
  }, [ pageDataLists, t ] );

  return (
    <div className="bg-white dark:bg-gray-900 p-6 w-full min-h-screen text-black dark:text-white">

      {/* Filter Section */}
      <div className="flex md:flex-row flex-col md:justify-between md:items-center md:space-x-4 mb-10">
        <h1 className="font-bold text-2xl">{t( 'pageDataManager' )}</h1>
        <div className='flex gap-4 min-w-150'>
          {/* Search Input */}
          <input
            type="text"
            placeholder={t( 'searchByNameOrLink' )}
            value={searchTerm}
            onChange={( e ) => setSearchTerm( e.target.value )}
            className="mb-2 md:mb-0 input-field"
          />

          {/* Type Select */}

          <Dropdown
            value={selectedType}
            onChange={( val ) => setSelectedType( val )}
            options={typeOptions}
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        {/* Form */}
        <form
          onSubmit={handleSubmit( onSubmit )}
          className="col-span-1 bg-gray-100 dark:bg-gray-800 shadow p-4 rounded"
        >
          <h2 className="mb-4 font-semibold text-xl">
            {editId ? t( 'editPageData' ) : t( 'addPageData' )}
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'name' )}</label>
            <input
              className="input-field"
              {...register( 'name', {required: t( 'validation.required' )} )}
              placeholder={t( 'enterName' )}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Link */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'link' )}</label>
            <input
              className="input-field"
              {...register( 'link', {required: t( 'validation.required' )} )}
              placeholder={t( 'enterLink' )}
            />
            {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'description' )}</label>
            <textarea
              className="input-field"
              {...register( 'disc' )}
              placeholder={t( 'enterDescription' )}
            />
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'type' )}</label>
            <input
              className="input-field"
              {...register( 'type', {required: t( 'validation.required' )} )}
              placeholder={t( 'enterType' )}
            />
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>

          {/* Media Path */}
          <div className="mb-4">
            <label className="block mb-1">{t( 'mediaPath' )}</label>
            <input
              className="input-field"
              {...register( 'mediaPath' )}
              placeholder={t( 'enterIconOrUrl' )}
            />
          </div>

          {/* isActive */}
          <div className="mb-4">
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" {...register( 'isActive' )} />
              <span>{t( 'active' )}</span>
            </label>
          </div>

          <div className="flex space-x-2">
            <LoadingButton
              type="submit"
              loading={loading}
              className="bg-primary-500 hover:bg-primary-600 disabled:opacity-70 px-4 py-2 rounded text-white"
            >
              {editId ? t( 'update' ) : t( 'add' )}
            </LoadingButton>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white"
              >
                {t( 'cancel' )}
              </button>
            )}
          </div>
        </form>

        {/* Table */}
        <div className="col-span-1 md:col-span-2 bg-gray-100 dark:bg-gray-800 shadow p-4 rounded overflow-x-auto">
          <h2 className="mb-4 font-semibold text-xl">{t( 'pageDataList' )}</h2>

          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border">{t( 'media' )}</th>
                <th className="p-2 border">{t( 'name' )}</th>
                <th className="p-2 border">{t( 'link' )}</th>
                <th className="p-2 border">{t( 'type' )}</th>
                <th className="p-2 border">{t( 'active' )}</th>
                <th className="p-2 border">{t( 'actions' )}</th>
              </tr>
            </thead>
            <tbody>
              {pageDataLists
                .filter( ( item ) => {
                  const matchesSearch =
                    item.name.toLowerCase().includes( searchTerm.toLowerCase() ) ||
                    item.link.toLowerCase().includes( searchTerm.toLowerCase() );

                  const matchesType = selectedType ? item.type === selectedType : true;

                  return matchesSearch && matchesType;
                } )
                .map( ( item ) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-2 border text-center">
                      {item.mediaPath ? (
                        isImagePath( item.mediaPath ) ? (
                          <img
                            src={item.mediaPath}
                            alt="media"
                            className="mx-auto w-6 h-6 object-cover"
                          />
                        ) : (
                          <span className="text-sm">{item.mediaPath}</span>
                        )
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{item.link}</td>
                    <td className="p-2 border">{item.type}</td>
                    <td className="p-2 border text-center">
                      {item.isActive ? t( 'yes' ) : t( 'no' )}
                    </td>
                    <td className="space-x-2 p-2 border text-center">
                      <button
                        onClick={() => handleEdit( item )}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete( item.id )}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>


                ) )}

              {pageDataLists.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-gray-500 text-center">
                    {t( 'noData' )}
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
