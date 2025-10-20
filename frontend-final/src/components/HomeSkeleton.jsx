// src/components/HomeSkeleton.jsx
import React from 'react';

function HomeSkeleton() {
  return (
    <div className="flex flex-col bg-app min-h-screen animate-pulse">

      {/* 🟦 Navbar skeleton */}
      <header className="bg-app shadow p-4">
        <div className="flex justify-between items-center mx-auto container">
          <div className="bg-gray-300 rounded w-24 h-6" />
          <div className="flex space-x-4">
            <div className="bg-gray-300 rounded w-12 h-6" />
            <div className="bg-gray-300 rounded w-12 h-6" />
            <div className="bg-gray-300 rounded w-12 h-6" />
          </div>
        </div>
      </header>

      {/* 🏞️ Hero section skeleton */}
      <section className="flex-1 bg-app py-16">
        <div className="mx-auto text-center container">
          <div className="bg-gray-300 mx-auto mb-4 rounded w-2/3 h-8" />
          <div className="bg-gray-300 mx-auto mb-6 rounded w-1/2 h-6" />
          <div className="bg-gray-400 mx-auto rounded w-40 h-10" />
        </div>
      </section>

      {/* 🧱 Content cards skeleton */}
      <section className="bg-app py-12">
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mx-auto px-4 container">
          {[ 1, 2, 3 ].map( ( _, index ) => (
            <div key={index} className="bg-app shadow p-6 border rounded">
              <div className="bg-gray-300 mb-2 rounded w-1/2 h-5" />
              <div className="bg-gray-300 rounded w-3/4 h-4" />
            </div>
          ) )}
        </div>
      </section>

      {/* 🔻 Footer skeleton */}
      <footer className="bg-app mt-auto py-4 text-white text-center">
        <div className="bg-gray-600 mx-auto rounded w-1/3 h-4" />
      </footer>
    </div>
  );
}

export default HomeSkeleton;