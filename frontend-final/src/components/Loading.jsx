// src/components/Loading.jsx
import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center bg-app h-screen">
      <div className="text-center">
        <div className="mx-auto mb-4 border-4 border-t-transparent border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        <p className="font-medium text-gray-500 text-lg">Loading Page...</p>
      </div>
    </div>
  );
}

export default Loading;