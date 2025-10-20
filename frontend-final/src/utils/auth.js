import api from './api';

/**
 * checkAuth
 * - Checks whether a token exists in localStorage
 * - If present, calls GET /me via the shared axios `api` instance
 * - Returns an object { authenticated: boolean, user?: object, error?: Error }
 * - Removes token from localStorage if server responds 401 (invalid/expired)
 *
 * Usage:
 * import { checkAuth } from '../utils/auth';
 * const { authenticated, user, error } = await checkAuth();
 */
export async function checkAuth() {
  const token = typeof window !== 'undefined' ? localStorage.getItem( 'token' ) : null;

  if ( !token ) {
    return {authenticated: false, user: null};
  }

  try {
    const response = await api.get( '/me' );
    const user = response.data?.data || response.data?.user || response.data;
    return {authenticated: true, user};
  } catch ( err ) {
    // If unauthorized, cleanup token (optional)
    if ( err.response?.status === 401 && typeof window !== 'undefined' ) {
      localStorage.removeItem( 'token' );
    }
    return {authenticated: false, error: err};
  }
}

export default checkAuth;
