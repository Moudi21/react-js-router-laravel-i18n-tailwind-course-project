// src/context/UserProvider.jsx
import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import api from "../utils/api";

export const UserContext = createContext();

export const UserProvider = ( {children} ) => {
  const [ token, setToken ] = useState( () => localStorage.getItem( "token" ) );
  const [ user, setUser ] = useState( null );
  const [ userData, setUserData ] = useState( {} );
  const [ isAuth, setIsAuth ] = useState( false );
  const [ loading, setLoading ] = useState( true );
  const [ errorMsg, setErrorMsg ] = useState( "" );

  // Persist token helpers
  const saveToken = ( newToken ) => {
    localStorage.setItem( "token", newToken );
    setToken( newToken );
  };
  const clearToken = () => {
    localStorage.removeItem( "token" );
    setToken( null );
  };

  // Fetch user (memoized, accepts explicit token to avoid stale closures)
  const fetchUser = useCallback(

    async ( currentToken = token ) => {
      if ( !currentToken ) {
        setIsAuth( false );
        setUser( null );
        setLoading( false );
        return;
      }
      setLoading( true );
      setErrorMsg( "" );
      try {
        const response = await api.get( "api/me" );
        console.log( response );

        const userData =
          response.data?.data || response.data?.user || response.data;
        setUser( userData );
        setIsAuth( true );
      } catch ( error ) {
        // If token is invalid or request fails, log out gracefully
        // logout();
        setIsAuth( false );
        setErrorMsg(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load user"
        );
      } finally {
        setLoading( false );
      }
    },
    [ token ]
  );

  // Initial and token-change fetch
  useEffect( () => {
    fetchUser();
  }, [ token, fetchUser ] );

  // Login and immediate user fetch
  const login = async ( credentials ) => {
    setLoading( true );
    setErrorMsg( "" );
    try {
      const response = await api.post( "/login", credentials );
      console.log( response );
      const data = response.data || {};
      const receivedToken =
        data?.data?.token || data?.token || data?.accessToken;

      if ( !receivedToken ) throw new Error( "No token received" );

      saveToken( receivedToken );
      await fetchUser( receivedToken );
    } catch ( error ) {
      setErrorMsg(
        error?.response?.data?.message || error?.message || "Login failed"
      );
      setIsAuth( false );
      setUser( null );
    } finally {
      setLoading( false );
    }
  };

  // Logout clears everything
  const logout = () => {
    clearToken();
    setUser( null );
    setIsAuth( false );
    setErrorMsg( "" );
  };

  // Expose a manual refresh
  const refreshUser = () => fetchUser();


  useEffect( () => {
    // set User Data
    const getUserData = () => {
      setUserData(
        {
          address: "lebanon",
          phone: "70123456",
          city: "gaza"
        },
        {
          subscribeCourse: []
        }
      );
    };
    getUserData();
  }, [] );



  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ( {
      isAuth,
      user,
      errorMsg,
      token,
      loading,
      login,
      logout,
      userData,
      setUser,
      refreshUser,
    } ),
    [ isAuth, user, errorMsg, token, loading, login, logout,
      userData ]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};