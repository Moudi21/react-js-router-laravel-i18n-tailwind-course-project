// src/utils/api.js (Enhanced version)
import axios from "axios";

// Create axios instance
const api = axios.create( {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  timeout: 10000,
  withCredentials: true, // if you are using cookies for Sanctum stateful authentication
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
} );

let isRefreshing = false;
let failedQueue = [];

const processQueue = ( error, token = null ) => {
  failedQueue.forEach( prom => {
    if ( error ) {
      prom.reject( error );
    } else {
      prom.resolve( token );
    }
  } );

  failedQueue = [];
};

// Request interceptor: attach token if available
api.interceptors.request.use(
  ( config ) => {
    try {
      const token = localStorage.getItem( "token" );
      if ( token ) {
        config.headers.Authorization = `Bearer ${ token }`;
      }
    } catch ( err ) {
      console.error( "Error reading token:", err );
    }
    return config;
  },
  ( error ) => Promise.reject( error )
);

// Response interceptor: handle errors globally
api.interceptors.response.use(
  ( response ) => response,
  async ( error ) => {
    const originalRequest = error.config;

    if ( error.response?.status === 401 && !originalRequest._retry ) {
      if ( isRefreshing ) {
        return new Promise( ( resolve, reject ) => {
          failedQueue.push( {resolve, reject} );
        } ).then( token => {
          originalRequest.headers.Authorization = `Bearer ${ token }`;
          return api( originalRequest );
        } ).catch( err => Promise.reject( err ) );
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem( 'refresh_token' );
        if ( refreshToken ) {
          const response = await api.post( '/api/refresh-token', {
            refresh_token: refreshToken
          } );

          const newToken = response.data.access_token;
          localStorage.setItem( 'token', newToken );

          // Retry the original request
          api.defaults.headers.Authorization = `Bearer ${ newToken }`;
          processQueue( null, newToken );

          return api( originalRequest );
        } else {
          // No refresh token, clear auth and redirect to login
          clearAuthAndRedirect();
          return Promise.reject( error );
        }
      } catch ( refreshError ) {
        processQueue( refreshError, null );
        clearAuthAndRedirect();
        return Promise.reject( refreshError );
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    if ( !error.response ) {
      // Network or CORS error
      console.error( "Network error:", error );
    } else {
      const {status} = error.response;
      if ( status === 403 ) {
        console.warn( "Forbidden: insufficient permissions" );
      } else if ( status === 404 ) {
        console.warn( "Resource not found" );
      } else if ( status >= 500 ) {
        console.error( "Server error:", error.response.data );
      }
    }

    return Promise.reject( error );
  }
);

function clearAuthAndRedirect() {
  localStorage.removeItem( 'token' );
  localStorage.removeItem( 'refresh_token' );
  localStorage.removeItem( 'user' );

}

export default api;