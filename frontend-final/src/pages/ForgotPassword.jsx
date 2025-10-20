// src/pages/ForgotPassword.jsx

import React, {useState} from 'react';
import api from '../utils/api';
import {t} from 'i18next';

const ForgotPassword = () => {
  const [ email, setEmail ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const [ error, setError ] = useState( '' );

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setMessage( '' );
    setError( '' );

    if ( !email || !/\S+@\S+\.\S+/.test( email ) ) {
      setError( 'Please enter a valid email address' );
      return;
    }

    try {
      const res = await api.post( '/login', {email} );
      setMessage( res.data?.message || 'Password reset link sent to your email.' );
    } catch ( err ) {
      const errMsg = err.response?.data?.message || 'Something went wrong.';
      setError( errMsg );
    }
  };

  return (
    <div className='flex flex-col justify-center gap-4 mt-20 lg:ps-5 min-w-80'>
      <h2 className='font-semibold text-2xl'>Forgot Password</h2>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className='relative flex flex-col gap-1'>
          <label className='font-semibold text-sm'>Email Address:</label>
          <input className='px-3 py-2 border border-gray-200 rounded-lg text-sm'
            type="email"
            value={email}
            onChange={( e ) => setEmail( e.target.value )}
            autoComplete="email"
            placeholder={t( 'email' )}
          />
        </div>

        <button type="submit" className='flex justify-center bg-primary-500 hover:bg-primary-600 mt-4 py-2 border border-primary-500 rounded-lg w-full text-white text-sm transition cursor-pointer'>Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;