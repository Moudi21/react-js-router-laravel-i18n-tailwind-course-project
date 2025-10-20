import {useState, useRef, useEffect} from "react";
import {FiChevronDown} from "react-icons/fi";

export default function DropDownFilter( {
  items = [],
  title,
  isOpen = false,
  filters,
  handleCheckboxChange,
} ) {
  const [ open, setOpen ] = useState( isOpen );
  const [ height, setHeight ] = useState( "0px" );
  const contentRef = useRef( null );

  const nameFilter = title.toLowerCase();

  useEffect( () => {
    if ( contentRef.current ) {
      setHeight( open ? `${ contentRef.current.scrollHeight }px` : "0px" );
    }
  }, [ open, items.length ] );

  return (
    <div className="border-gray-200 dark:border-gray-700 border-b overflow-hidden">
      {/* Dropdown Header */}
      <button
        className="flex justify-between items-center py-3 w-full font-semibold text-gray-700 dark:text-gray-200 text-xl cursor-pointer"
        aria-expanded={open}
        aria-controls={`dropdown-${ nameFilter }`}
        onClick={() => setOpen( ( v ) => !v )}
      >
        {title}
        <FiChevronDown
          className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${ open ? "rotate-180" : "rotate-0"
            }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Content */}
      <div
        id={`dropdown-${ nameFilter }`}
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{maxHeight: height}}
      >
        <div className="flex flex-col gap-2 py-2">
          {items.map( ( item ) => {
            const isChecked = filters[ nameFilter ]?.includes( item.toLowerCase() );
            return (
              <label
                key={item}
                htmlFor={item}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                {/* ✅ Custom Checkbox */}
                <input
                  id={item}
                  name={title}
                  type="checkbox"
                  value={item}
                  checked={isChecked}
                  onChange={( e ) => handleCheckboxChange( nameFilter, item, e.target.checked )}
                  className="sr-only"
                />

                <span
                  aria-hidden="true"
                  className={`relative flex items-center justify-center w-5 h-5 rounded-md border-2 transition-colors duration-200
      ${ isChecked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300" }
    `}
                >
                  <svg
                    className={`absolute w-3 h-3 text-white transform transition-transform duration-150 ${ isChecked ? "scale-100 opacity-100" : "scale-75 opacity-0"
                      }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 10.5L8.25 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  <span
                    className={`absolute inset-0 rounded-md transition-transform duration-200 transform ${ isChecked ? "scale-100" : "scale-95"
                      }`}
                  />
                </span>

                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </label>
            );
          } )}
        </div>
      </div>
    </div>
  );
}
