// src/components/Logo.jsx
import React from 'react';
import {Link} from 'react-router';

const Logo = () => {

  return (
    <Link
      to="/"
      className="flex justify-center items-center mx-auto max-w-40 font-bold text-xl hover:scale-105 transition-transform duration-500 transform"
      dir="ltr" // ← Forces LTR direction regardless of language
    >
      <span className="text-app-color">Skill</span>
      <span className="text-blue-500">Nest.</span>
    </Link>
  );
};

export default Logo;
