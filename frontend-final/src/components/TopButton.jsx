import {useEffect, useState} from "react";
import {HiOutlineChevronUp} from "react-icons/hi2";

export default function TopButton( {
  showAt = 200,
  size = "w-12 h-12",         // use safe Tailwind classes (no dynamic templates)
  className = "",
  ariaLabel = "Scroll to top",
} ) {
  const [ visible, setVisible ] = useState( false );

  useEffect( () => {
    const onScroll = () => setVisible( window.scrollY > showAt );
    onScroll();
    window.addEventListener( "scroll", onScroll, {passive: true} );
    return () => window.removeEventListener( "scroll", onScroll );
  }, [ showAt ] );

  const base =
    "fixed right-6 bottom-8 z-50 flex items-center cursor-pointer justify-center text-white rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 ";

  // Tailwind-only enter/exit handled with utility classes
  // - when visible: translate-y-0 opacity-100 scale-100
  // - when hidden: translate-y-6 opacity-0 scale-95 pointer-events-none
  const motion = visible
    ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
    : "translate-y-6 opacity-0 scale-95 pointer-events-none";

  const interaction =
    "transition-transform transition-opacity duration-200 ease-out hover:-translate-y-1 active:scale-95";

  return (
    <button
      type="button"
      onClick={() => window.scrollTo( {top: 0, behavior: "smooth"} )}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`${ base } ${ size } ${ motion } ${ interaction } ${ className }`}
      tabIndex={visible ? 0 : -1}
    >
      {/* If you don't have heroicons, replace with inline SVG below */}
      <HiOutlineChevronUp className="w-6 h-6" aria-hidden="true" />
    </button>
  );
}