import React from 'react';

const CardSkeleton = ( {count = 5} ) => {
  return (
    <>
      {Array.from( {length: count} ).map( ( _, index ) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-800 shadow p-4 rounded-xl w-full h-full animate-pulse"
        >
          <div className="flex justify-center items-center bg-gray-300 dark:bg-gray-700 mx-auto mb-4 rounded w-20 h-12" />
          <div className="bg-gray-300 dark:bg-gray-700 mx-auto rounded w-3/4 h-4" />
        </div>
      ) )}
    </>
  );
};

export default CardSkeleton;
