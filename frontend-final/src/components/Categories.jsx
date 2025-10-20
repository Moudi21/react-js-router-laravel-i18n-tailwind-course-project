import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {HiChevronRight, HiMiniChevronDown, HiOutlineBars3} from 'react-icons/hi2';
import {useNavigate} from 'react-router';
import api from '../utils/api';

function Categories() {
  const [ open, setOpen ] = useState( false );
  const {t} = useTranslation();
  const [ categories, setCategories ] = useState( [] );
  const [ hoveredCategory, setHoveredCategory ] = useState( null );
  const [ error, setError ] = useState( null );

  const itemsRef = useRef( null );
  const navigate = useNavigate();

  useEffect( () => {
    setHoveredCategory( null );
  }, [ open ] );

  useEffect( () => {
    const getCategories = async () => {
      try {
        const res = await api.get( '/category-courses' );
        setCategories( res.data );
      } catch ( error ) {
        console.error( 'Failed to fetch categories:', error );
        setError( 'Failed to fetch categories', error );
      }
    };

    const handleClickOutside = ( event ) => {
      if ( itemsRef.current && !itemsRef.current.contains( event.target ) ) {
        setHoveredCategory( null );
        setOpen( false );
      }
    };

    getCategories();
    document.addEventListener( 'mousedown', handleClickOutside );

    return () => document.removeEventListener( 'mousedown', handleClickOutside );
  }, [] );

  const handleCategoryClick = ( categoryId, categoryName ) => {
    console.log( 'Category clicked:', {id: categoryId, name: categoryName} );
  };

  const handleItemClick = ( itemName ) => {
    console.log( itemName );

    const name = itemName.toLowerCase();
    navigate( `/courses?category=${ name }` );
    setHoveredCategory( null );
    setOpen( false );
  };

  const hoveredCategoryData = categories.find( cat => cat.id === hoveredCategory );
  const hasItems = hoveredCategoryData?.children?.length > 0;

  return (
    <div className="group hidden lg:inline-block relative" ref={itemsRef}>
      {/* Categories Button */}
      <button
        onClick={() => setOpen( v => !v )}
        className="flex items-center gap-1 px-4 py-2 rounded-full active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <HiOutlineBars3 className="text-2xl" />
        <span className="text-gray-700 dark:text-gray-200">{t( 'categories.title' )}</span>
        <HiMiniChevronDown className={`text-2xl transition-transform duration-300 ${ open ? "rotate-180" : "" }`} />
      </button>

      {/* Main Dropdown */}
      <div className={`
        absolute top-full mt-3 bg-white dark:bg-gray-900 
        shadow-2xl border border-gray-200 dark:border-gray-700 
        rounded-2xl min-w-84 max-h-[520px] overflow-hidden
        transition-all duration-200 z-10
        ${ open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none" }
      `}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 dark:from-gray-800 to-indigo-50 dark:to-gray-800 px-4 py-3 border-gray-200 dark:border-gray-700 border-b">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm uppercase">
            {t( 'Browse Categories' )}
          </h3>
        </div>

        {/* Categories List */}
        <div className="max-h-[440px] overflow-y-auto">
          <ul className="py-1">
            {categories.map( ( category, index ) => (
              <li
                key={category.id}
                onMouseEnter={() => setHoveredCategory( category.id )}
                className="relative"
              >
                <div
                  onClick={() => handleCategoryClick( category.name )}
                  className={`
                    flex items-center justify-between gap-3 px-4 py-3.5 mx-2 my-1 rounded-xl
                    cursor-pointer transition-all duration-200
                    hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                    dark:hover:from-gray-800 dark:hover:to-gray-700
                    ${ hoveredCategory === category.id ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-md' : '' }
                  `}
                >
                  <div className="flex flex-1 items-center gap-3 min-w-0">
                    <span className="text-2xl">{category.mediaPath ?? '📁'}</span>
                    <div className="flex-1 min-w-0">
                      <span className="block text-gray-800 dark:text-gray-100 truncate">
                        {t( category.name )}
                      </span>
                      {category.children?.length > 0 && (
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          {category.children.length} {t( 'items' )}
                        </span>
                      )}
                    </div>
                  </div>
                  {category.children?.length > 0 && (
                    <HiChevronRight className="flex-shrink-0 text-gray-400" />
                  )}
                </div>
              </li>
            ) )}

            {error && <span className='flex justify-center py-1 text-red-600'>{error}</span>}
          </ul>
        </div>
      </div>

      {/* Sub-items Panel */}
      {hasItems && (
        <div
          className="top-full absolute mt-3 start-86"
          onMouseEnter={() => setHoveredCategory( hoveredCategory )}
          onMouseLeave={() => setHoveredCategory( null )}
        >
          <div className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl min-w-80">
            {/* Category Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 dark:from-gray-800 to-indigo-50 dark:to-gray-800 px-4 py-3 border-gray-200 dark:border-gray-700 border-b">
              <span className="text-3xl">{hoveredCategoryData.mediaPath}</span>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                  {t( hoveredCategoryData.name )}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {hoveredCategoryData.children.length} {t( 'items available' )}
                </p>
              </div>
            </div>

            {/* Items Grid */}
            <div className="p-2 max-h-96 overflow-y-auto">
              <div className="gap-2 grid grid-cols-2">
                {hoveredCategoryData.children.map( ( item ) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick( item.name )}
                    className="group flex flex-col items-center gap-2 bg-gray-50 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-900 p-3 border border-gray-200 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-500 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {item.mediaPath ?? '•'}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 text-xs text-center line-clamp-2">
                      {t( item.name )}
                    </span>
                  </div>
                ) )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;