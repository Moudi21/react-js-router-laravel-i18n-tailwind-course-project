import React, {useState, useRef, useEffect} from "react";
import {FiChevronDown} from "react-icons/fi";

const Dropdown = ( {
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  className = "",
} ) => {
  const [ open, setOpen ] = useState( false );
  const [ search, setSearch ] = useState( "" );
  const [ highlightIndex, setHighlightIndex ] = useState( -1 );
  const dropdownRef = useRef( null );

  // Close dropdown on outside click
  useEffect( () => {
    const handleClickOutside = ( e ) => {
      if ( dropdownRef.current && !dropdownRef.current.contains( e.target ) ) {
        setOpen( false );
      }
    };
    document.addEventListener( "mousedown", handleClickOutside );
    return () => document.removeEventListener( "mousedown", handleClickOutside );
  }, [] );

  // Recursive search for selected option
  const findOptionByValue = ( opts, val ) => {
    for ( const opt of opts ) {
      if ( opt.value === val ) return opt;
      if ( Array.isArray( opt.children ) ) {
        const child = findOptionByValue( opt.children, val );
        if ( child ) return child;
      }
    }
    return null;
  };

  const selectedLabel =
    findOptionByValue( options, value )?.label || placeholder;

  // Filter options by search
  const filterOptions = ( opts ) =>
    opts
      .map( ( opt ) => {
        const matches = opt.label
          .toLowerCase()
          .includes( search.toLowerCase() );
        const children = Array.isArray( opt.children )
          ? filterOptions( opt.children )
          : [];
        if ( matches || children.length > 0 ) {
          return {...opt, children};
        }
        return null;
      } )
      .filter( Boolean );

  const filteredOptions = filterOptions( options );

  const handleSelect = ( selected ) => {
    onChange( selected.value );
    setOpen( false );
    setSearch( "" );
  };

  // Keyboard navigation
  const handleKeyDown = ( e ) => {
    if ( !open ) return;
    if ( e.key === "ArrowDown" ) {
      e.preventDefault();
      setHighlightIndex( ( prev ) =>
        prev + 1 >= filteredOptions.length ? 0 : prev + 1
      );
    } else if ( e.key === "ArrowUp" ) {
      e.preventDefault();
      setHighlightIndex( ( prev ) =>
        prev - 1 < 0 ? filteredOptions.length - 1 : prev - 1
      );
    } else if ( e.key === "Enter" && highlightIndex >= 0 ) {
      e.preventDefault();
      handleSelect( filteredOptions[ highlightIndex ] );
    } else if ( e.key === "Escape" ) {
      setOpen( false );
    }
  };

  // Render option (with children)
  const renderOption = ( opt, depth = 0 ) => (
    <li
      key={opt.value}
      onClick={() => handleSelect( opt )}
      className={`cursor-pointer px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-600 ${ value === opt.value ? "bg-blue-100 dark:bg-blue-600 font-medium" : ""
        }`}
      style={{paddingLeft: `${ 12 + depth * 12 }px`}}
      role="option"
      aria-selected={value === opt.value}
    >
      <div className="flex justify-between items-center">
        <span>{opt.label}</span>
        {opt.meta && (
          <span className="ml-2 text-gray-400 text-xs">{opt.meta}</span>
        )}
      </div>
      {Array.isArray( opt.children ) && opt.children.length > 0 && (
        <ul className="mt-1 border-gray-100 dark:border-gray-700 border-l">
          {opt.children.map( ( child ) => renderOption( child, depth + 1 ) )}
        </ul>
      )}
    </li>
  );

  return (
    <div
      className={`relative inline-block w-full ${ className }`}
      ref={dropdownRef}
    >
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen( ( prev ) => !prev )}
        onKeyDown={handleKeyDown}
        className="flex justify-between items-center gap-2 w-full input-field"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selectedLabel}</span>
        <FiChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${ open ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="z-20 absolute bg-white dark:bg-gray-800 shadow-lg mt-1 border border-gray-200 dark:border-gray-700 rounded-lg w-full">
          {/* Search box */}
          <div className="p-2">
            <input
              type="text"
              value={search}
              onChange={( e ) => setSearch( e.target.value )}
              placeholder="Search..."
              className="bg-gray-50 dark:bg-gray-700 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-gray-800 dark:text-gray-100 text-sm"
            />
          </div>

          {/* Options list */}
          <ul
            className="py-1 max-h-48 overflow-y-auto text-sm"
            role="listbox"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map( ( opt ) => renderOption( opt ) )
            ) : (
              <li className="px-3 py-2 text-gray-400 dark:text-gray-500">
                No results
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;