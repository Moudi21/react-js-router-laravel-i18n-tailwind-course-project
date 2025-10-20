// src/pages/Register.jsx

import React, {useState} from 'react';
import {Link} from 'react-router';
import api from '../utils/api';
import {HiOutlineLockClosed, HiOutlineLockOpen, HiOutlineEnvelope, HiOutlineUser} from "react-icons/hi2";
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import Logo from '../components/Logo';
import LoadingButton from '../components/LoadingButton';

const Register = () => {

  const {t} = useTranslation();

  const [ message, setMessage ] = useState( '' );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ loading, setLoading ] = useState( false );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors}
  } = useForm( {
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    mode: 'onChange'
  } );

  const password = watch( 'password' );

  const togglePasswordVisibility = () => {
    setShowPassword( ( prev ) => !prev );
  };

  const onSubmit = async ( data ) => {
    setMessage( '' );
    setLoading( true );

    try {

      const res = await api.post( '/register', data );
      setMessage( 'Registration successful!' );
      console.log( 'Registered user:', res.data );
      reset();
    } catch ( error ) {
      const errMsg =
        error.response?.data?.message || 'Registration failed. Try again.';
      setMessage( errMsg );
      console.error( 'Error registering:', error );
    } finally {
      setLoading( false );
    }
  };

  return (

    <div className='flex flex-col justify-center bg-app mx-auto px-1 lg:px-6 py-4 rounded-2xl w-full max-w-md' aria-labelledby="register-heading">
      <div className='space-y-2 mb-5 text-center'>
        <Logo />
        <h1 className='font-bold text-gray-900 dark:text-white text-2xl tracking-tight'>{t( "create an account" )}</h1>
      </div>

      {message && (
        <div
          className={`p-4 text-sm rounded-lg animate-fadeIn ${ message.includes( 'successful' )
            ? 'text-green-800 bg-green-50 dark:bg-green-900/50 dark:text-green-200'
            : 'text-red-800 bg-red-50 dark:bg-red-900/50 dark:text-red-200'
            }`}
          role="alert"
          aria-live="polite"
        >
          <span className="font-medium">{message.includes( 'successful' ) ? 'Success:' : 'Error:'}</span> {message}
        </div>
      )}

      <form onSubmit={handleSubmit( onSubmit )} noValidate className='flex flex-col gap-4 mt-2'>
        <div className='relative'>
          <input className='input-field'
            type="text"
            {...register( 'fullname', {
              required: t( 'Fullname is required' ),
              minLength: {
                value: 2,
                message: t( 'Fullname must be at least 2 characters' )
              }
            } )}
            placeholder={t( 'fullname' )}
          />
          <span className='top-2.5 absolute text-gray-400 text-xl end-2'><HiOutlineUser /></span>
          {errors.fullname && <small className="text-red-500">{errors.fullname.message}</small>}
        </div>



        <div className='relative'>
          <input className='input-field'
            type="email"
            {...register( 'email', {
              required: t( 'Email is required' ),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t( 'Invalid email format' )
              }
            } )}
            placeholder={t( 'email' )}
          />
          <span className='top-2.5 absolute text-gray-400 text-xl end-2'><HiOutlineEnvelope /></span>
          {errors.email && <p className="mt-1 ml-1 text-red-500 text-sm animate-fadeIn">{errors.email.message}</p>}
        </div>

        <div className='gap-2 grid grid-cols-2'>

          <div className='relative'>
            <input className='input-field'
              type={showPassword ? 'text' : 'password'}
              {...register( 'password', {
                required: t( 'Password is required' ),
                minLength: {
                  value: 8,
                  message: t( 'Password must be at least 8 characters' )
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: t( 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' )
                }
              } )}
              autoComplete="password"
              placeholder={t( 'password' )}
            />
            <span className='top-2.5 absolute text-gray-400 text-xl end-2'>{showPassword ? <HiOutlineLockOpen /> : <HiOutlineLockClosed />}</span>
            {errors.password && <p className="mt-1 ml-1 text-red-500 text-sm animate-fadeIn">{errors.password.message}</p>}
          </div>


          <div className='relative'>
            <input className='input-field'
              type={showPassword ? 'text' : 'password'}
              {...register( 'password_confirmation', {
                required: t( 'Please confirm your password' ),
                validate: ( value ) =>
                  value === password || t( 'The passwords do not match' )
              } )}
              autoComplete="confirm password"
              placeholder={t( 'confirmPassword' )}
            />
            <span className='top-2.5 absolute text-gray-400 text-xl end-2'>{showPassword ? <HiOutlineLockOpen /> : <HiOutlineLockClosed />}</span>
            {errors.password_confirmation && <p className="mt-1 ml-1 text-red-500 text-sm animate-fadeIn">{errors.password_confirmation.message}</p>}
          </div>
        </div>

        <div className='flex items-center gap-2 mt-1'>
          <input className='dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500/20 w-4 h-4 text-primary-500 transition-colors duration-200 cursor-pointer'
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          <label className='text-gray-700 hover:text-gray-900 dark:hover:text-white dark:text-gray-300 text-sm transition-colors duration-200 cursor-pointer select-none'
            htmlFor="showPassword">{t( "show password" )}</label>
        </div>

        <LoadingButton
          type="submit"
          loading={loading}
          className='bg-primary-500 hover:bg-primary-600 disabled:opacity-70 mt-3 py-2 border border-primary-500 rounded-lg w-full text-white text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed transform'
        >
          {t( "register" )}
        </LoadingButton>
        <div className='flex justify-center items-center gap-2'>
          <span className='text-gray-600 dark:text-gray-400 text-sm'>{t( "already have an account?" )}</span>
          <Link
            className='font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors duration-200'
            to="/login">{t( "login" )}</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;