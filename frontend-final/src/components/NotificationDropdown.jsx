import {useEffect, useRef, useState} from "react";
import {FiBell} from "react-icons/fi";
import {IoClose} from "react-icons/io5";

const sampleNotifications = [
  {
    id: 1,
    title: "New Course Available",
    message: "Introduction to AI is now available.",
    courseName: "Introduction to AI",
    date: "2025-10-08"
  },
  {
    id: 2,
    title: "Course Released",
    message: "Mastering Python Programming has been added.",
    courseName: "Mastering Python Programming",
    date: "2025-10-07"
  }
  ,
  {
    id: 2,
    title: "Course Released",
    message: "Mastering Python Programming has been added.",
    courseName: "Mastering Python Programming",
    date: "2025-10-07"
  }
  ,
  {
    id: 2,
    title: "Course Released",
    message: "Mastering Python Programming has been added.",
    courseName: "Mastering Python Programming",
    date: "2025-10-07"
  }
];

export default function NotificationDropdown( {useSampleData = true} ) {
  const [ open, setOpen ] = useState( false );
  const [ items, setItems ] = useState( [] );
  const ref = useRef( null );

  useEffect( () => {
    setItems( useSampleData ? sampleNotifications : [] );
  }, [ useSampleData ] );

  useEffect( () => {
    const handleClickOutside = ( e ) => {
      if ( ref.current && !ref.current.contains( e.target ) ) {
        setOpen( false );
      }
    };
    document.addEventListener( "mousedown", handleClickOutside );
    return () => document.removeEventListener( "mousedown", handleClickOutside );
  }, [] );

  const formatDate = ( dateString ) => {
    return new Date( dateString ).toLocaleDateString();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen( !open )}
        className="relative hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full text-gray-600 dark:text-gray-300 transition-colors"
      >
        <FiBell className="w-5 h-5" />
        {items.length > 0 && (
          <span className="-top-1 -right-1 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-white text-xs">
            {items.length}
          </span>
        )}
      </button>

      {open && (
        <div className="top-12 right-0 z-50 absolute bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg w-80">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-gray-200 dark:border-gray-700 border-b">
            <h3 className="font-semibold">Notifications</h3>
            <button onClick={() => setOpen( false )} className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded">
              <IoClose className="w-4 h-4" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-72 overflow-y-auto">
            {items.length === 0 ? (
              <p className="p-4 text-gray-500 text-center">No notifications</p>
            ) : (
              items.map( ( n ) => (
                <div key={n.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 p-4 border-gray-200 dark:border-gray-700 border-b">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm">{n.title}</p>
                    <span className="text-gray-500 text-xs">{formatDate( n.date )}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{n.message}</p>
                  {n.courseName && (
                    <p className="mt-1 text-blue-600 dark:text-blue-400 text-xs">{n.courseName}</p>
                  )}
                </div>
              ) )
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-3 border-gray-200 dark:border-gray-700 border-t">
              <button className="w-full text-blue-600 dark:text-blue-400 text-sm text-center hover:underline">
                View all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}