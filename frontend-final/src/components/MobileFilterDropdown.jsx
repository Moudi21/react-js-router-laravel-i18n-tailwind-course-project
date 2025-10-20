import React, {useState, useEffect} from 'react';
import {FaTimes, FaCheck, FaSearch, FaFilter} from 'react-icons/fa';

const MobileFilterDropdown = ( {
  children,
  onClose,
} ) => {


  const handleApply = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };



  return (
    <div className="md:hidden z-50 fixed inset-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"
        onClick={handleClose}
      />

      {/* Filter Panel */}
      <div className="absolute inset-0 flex flex-col bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-gray-200 dark:border-gray-700 border-b">
          <h2 className="font-semibold text-gray-900 dark:text-white text-lg">
            Filters
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400 transition-colors duration-200"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Filter List */}
        <div className="p-2">
          {children}
        </div>

        {/* Footer Buttons */}
        <div className="bg-white dark:bg-gray-900 p-4 border-gray-200 dark:border-gray-700 border-t">
          <div className="flex space-x-3">
            <button
              onClick={handleApply}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 px-4 py-3 rounded-lg font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterDropdown;