
function CourseCardSkeleton( {count = 5} ) {
  return (
    <>
      {Array.from( {length: count} ).map( ( _, index ) => (
        <div
          key={index}
          className="group bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="bg-gray-300 dark:bg-gray-600 mb-3 rounded-lg w-full h-40" />

          {/* Title Skeleton */}
          <div className="mb-2 w-full h-11">
            <div className="bg-gray-300 dark:bg-gray-600 mb-2 rounded h-4" />
            <div className="bg-gray-300 dark:bg-gray-600 rounded w-3/4 h-4" />
          </div>

          {/* Category Skeleton */}
          <div className="bg-gray-200 dark:bg-gray-700 mb-3 rounded w-1/2 h-3" />

          {/* Price Skeleton */}
          <div className="bg-gray-300 dark:bg-gray-600 mb-3 rounded w-1/3 h-4" />

          {/* Footer Skeleton */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                {[ ...Array( 3 ) ].map( ( _, i ) => (
                  <div
                    key={i}
                    className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full w-6 h-6"
                  />
                ) )}
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded w-8 h-3" />
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-gray-200 dark:bg-gray-700 rounded w-4 h-4" />
              <div className="bg-gray-200 dark:bg-gray-700 rounded w-6 h-3" />
            </div>
          </div>
        </div>
      ) )}
    </>
  );
}

export default CourseCardSkeleton;