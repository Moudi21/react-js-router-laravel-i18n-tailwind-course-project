import {Link, useMatch} from "react-router";

function LinkTo( {
  to,
  children,
  className = "",
  activeClass = "",
} ) {

  const match = useMatch( {path: to, end: true} );

  const finalClassName = [
    className,
    match && activeClass,
    match && "pointer-events-none",
  ]
    .filter( Boolean )
    .join( " " );

  if ( match ) {
    return (
      <span className={finalClassName} aria-disabled="true">
        {children}
      </span>
    );
  }

  const scrollToTop = () => {
    window.scrollTo( {
      top: 0,
      behavior: 'smooth'
    } );
  };

  return (
    <Link to={to} onClick={scrollToTop} className={finalClassName}>
      {children}
    </Link>
  );
}

export default LinkTo;