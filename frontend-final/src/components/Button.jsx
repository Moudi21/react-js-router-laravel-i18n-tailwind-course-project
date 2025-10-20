import {Link} from 'react-router';

function Button( {link, title, outline, classSize} ) {
    return (
        <Link to={link} className={`${ outline ? "hover:bg-blue-500 text-blue-500 hover:text-white" : "text-white bg-blue-500 hover:border-blue-600 hover:bg-blue-700" } ${ classSize } text-center border border-blue-500 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all`}>
            {title}
        </Link>
    );
}

export default Button;