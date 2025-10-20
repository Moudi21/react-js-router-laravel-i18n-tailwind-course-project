import React, {useEffect, useRef} from 'react';
import {Outlet, useLocation} from 'react-router';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import i18n from '../i18n/I18n'; // Adjust path to your i18n config

const AppLayout = () => {
  const loadingRef = useRef( null );
  const location = useLocation();

  // ✅ Route change triggers loading bar
  useEffect( () => {
    loadingRef.current?.continuousStart();
    const timer = setTimeout( () => {
      loadingRef.current?.complete();
    }, 500 ); // simulate loading time

    return () => clearTimeout( timer );
  }, [ location ] );

  // ✅ Axios requests trigger loading bar
  useEffect( () => {
    const reqInterceptor = axios.interceptors.request.use( ( config ) => {
      loadingRef.current?.continuousStart();
      return config;
    } );

    const resInterceptor = axios.interceptors.response.use(
      ( response ) => {
        loadingRef.current?.complete();
        return response;
      },
      ( error ) => {
        loadingRef.current?.complete();
        return Promise.reject( error );
      }
    );

    return () => {
      axios.interceptors.request.eject( reqInterceptor );
      axios.interceptors.response.eject( resInterceptor );
    };
  }, [] );

  // ✅ i18n language change triggers loading bar
  useEffect( () => {
    const onLanguageChanged = () => {
      loadingRef.current?.continuousStart();
      setTimeout( () => {
        loadingRef.current?.complete();
      }, 500 );
    };

    i18n.on( 'languageChanged', onLanguageChanged );

    return () => {
      i18n.off( 'languageChanged', onLanguageChanged );
    };
  }, [] );

  return (
    <>
      <LoadingBar
        color=" oklch(54.6% 0.245 262.881)" // Tailwind indigo-600
        height={3}
        ref={loadingRef}
        shadow={false}
      />
      <Outlet />
    </>
  );
};

export default AppLayout;