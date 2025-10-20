import {Link} from 'react-router';

function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 h-[100vh]'>
      <h3 className='font-bold text-blue-500 text-6xl'>404!</h3>
      <span className='text-gray-500 text-2xl'>NotFound</span>
      <Link to="/" className='bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-white text-xl transition'>Go Back to Home</Link>
    </div>
  );
}

export default NotFound;