import {useState, useRef, useEffect} from "react";
import {HiMiniChevronUp} from "react-icons/hi2";
import {FiCheck} from "react-icons/fi";
import {useTranslation} from "react-i18next";

export default function DropDownInfo( {items, title, isOpen, backGround, textSize} ) {
  const [ open, setOpen ] = useState( isOpen );
  const [ height, setHeight ] = useState( "0px" );
  const contentRef = useRef( null );

  const {t} = useTranslation();

  useEffect( () => {
    if ( contentRef.current ) {
      setHeight( open ? `${ contentRef.current.scrollHeight }px` : "0px" );
    }
  }, [ open ] );

  return (
    <div className={`${ backGround ? backGround : "bg-gray-100" } dark:bg-app shadow-sm border dark:border-gray-700 border-gray-200 rounded-lg overflow-hidden`}>
      {/* Header Button */}
      <div className={`${ open && "border-gray-200 dark:border-gray-700 border-b" }`}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="learn-panel"
          onClick={() => setOpen( ( v ) => !v )}
          className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 w-full text-gray-700 dark:text-gray-300 text-left"
        >
          <h4 className={`${ textSize ? textSize : "text-2xl" } font-semibold`}>{t( title )}</h4>

          <HiMiniChevronUp
            className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${ open ? "rotate-0" : "rotate-180"
              }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Dropdown Panel */}
      <div
        id="learn-panel"
        ref={contentRef}
        style={{maxHeight: height}}
        className="overflow-hidden transition-max-h duration-300 ease-in-out"
      >
        <div className="px-6 py-6">
          <div className="gap-4 grid sm:grid-cols-2">
            {items.map( ( text ) => (
              <span key={text} className="flex items-start gap-3 text-gray-600 dark:text-gray-500">
                <span className="flex-none">
                  <FiCheck className="w-6 h-6 text-primary-500" />
                </span>
                <span className="text-sm leading-tight">{t( text )}</span>
              </span>
            ) )}
          </div>
        </div>
      </div>
    </div>
  );
}
