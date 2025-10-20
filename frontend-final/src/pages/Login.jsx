import {useContext, useState, useEffect} from 'react';
import {UserContext} from '../contexts/UserProvider';
import {Link} from 'react-router';
import {HiOutlineLockClosed, HiOutlineLockOpen, HiOutlineEnvelope} from "react-icons/hi2";
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import Logo from '../components/Logo';
import LoadingButton from '../components/LoadingButton';

function Login() {
  const {t} = useTranslation();
  const {login, errorMsg, loading, isAuth} = useContext( UserContext );
  const [ showPassword, setShowPassword ] = useState( false );

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm( {
    defaultValues: {
      login: '',
      password: ''
    }
  } );

  const togglePasswordVisibility = () => {
    setShowPassword( ( prev ) => !prev );
  };

  const onSubmit = async ( data ) => {
    await login( data );
  };

  return (
    <div className='flex flex-col justify-center bg-app backdrop-blur-sm mx-auto px-1 lg:px-6 py-3 rounded-2xl w-full max-w-md'>
      <div className='space-y-2 mb-5 text-center'>
        <Logo />
        <h2 className='font-bold text-gray-900 dark:text-white text-2xl tracking-tight'>{t( "welcome back" )}</h2>
      </div>

      {/* Show login error from server */}
      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-900/50 mb-4 p-4 rounded-lg text-red-800 dark:text-red-200 text-sm animate-fadeIn">
          <span className="font-medium">Error:</span> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit( onSubmit )} noValidate className='flex flex-col gap-4 mt-2'>
        <div className='relative'>
          <input className='input-field'
            type="text"
            {...register( 'login', {
              required: t( 'Email is required' )
            } )}
            autoComplete="text"
            placeholder={t( 'username' )}
          />
          <span className='top-2.5 absolute text-gray-400 text-xl end-2'><HiOutlineEnvelope /></span>

          {errors.login && (
            <p className="mt-1 ml-1 text-red-500 text-sm animate-fadeIn">{errors.login.message}</p>
          )}
        </div>

        <div className='relative'>
          <input className='input-field'
            type={showPassword ? 'text' : 'password'}
            {...register( 'password', {
              required: t( 'Password is required' ),
              minLength: {
                value: 8,
                message: t( 'Password must be at least 8 characters' )
              }
            } )}
            autoComplete="current-password"
            placeholder={t( 'password' )}
          />
          <span className='top-2.5 absolute text-gray-400 text-xl end-2'>{showPassword ? <HiOutlineLockOpen /> : <HiOutlineLockClosed />}</span>
          {errors.password && (
            <p className="mt-1 ml-1 text-red-500 text-sm animate-fadeIn">{errors.password.message}</p>
          )}
        </div>

        <div className='flex justify-between items-center mt-1'>
          <div className='flex items-center gap-2'>
            <input className='dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500/20 w-4 h-4 text-primary-500 transition-colors duration-200 cursor-pointer'
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label className='text-gray-700 hover:text-gray-900 dark:hover:text-white dark:text-gray-300 text-sm transition-colors duration-200 cursor-pointer select-none'
              htmlFor="showPassword">{t( "show password" )}</label>
          </div>
          <Link
            className='font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors duration-200'
            to="/forgot-password">{t( "forgot password?" )}</Link>
        </div>

        <LoadingButton
          type="submit"
          loading={loading}
          className='bg-primary-500 hover:bg-primary-600 disabled:opacity-70 mt-3 py-2 border border-primary-500 rounded-lg w-full text-white text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed transform'
        >
          {t( 'login' )}
        </LoadingButton>
        <div className='flex justify-center items-center gap-2'>
          <span className='text-gray-600 dark:text-gray-400 text-sm'>{t( "don't have an account?" )}</span>
          <Link
            className='font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors duration-200'
            to="/register">{t( "sing up for free" )}</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;