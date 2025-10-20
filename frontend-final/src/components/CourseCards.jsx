import {FaStar} from 'react-icons/fa';

const CourseCards = ( {course} ) => {
  const getPriceDisplay = () => {
    const price = Number( course.price );
    return isNaN( price ) || price === 0 ? "Free" : `$${ price.toFixed( 2 ) }`;
  };

  const rating = Number( course.rating ) || 0;

  return (
    <div className="group bg-white dark:bg-gray-800 hover:shadow-lg p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:scale-105 transition-all duration-300">
      <img
        src={course.image}
        alt={course.title}
        className="mb-3 rounded-lg w-full h-40 object-cover"
      />
      <h3 className="w-full h-11 font-semibold text-gray-600 dark:text-gray-200 line-clamp-2">
        {course.title}
      </h3>
      <p className="mb-2 text-gray-600 dark:text-gray-400 text-sm">{course.categoryName}</p>
      <p className="mb-3 font-bold text-primary-500">{getPriceDisplay()}</p>

      <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-3">
            {[ ...Array( 3 ) ].map( ( _, i ) => (
              <img
                key={i}
                src="/users-icon.jpg"
                alt=""
                className="border border-gray-300 rounded-full w-6 h-6"
              />
            ) )}
          </div>
          <span>{course.users || ''}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <span>{rating.toFixed( 1 )}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCards;