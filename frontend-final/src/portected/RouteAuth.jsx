import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router';
import {UserContext} from '../contexts/UserProvider';
import Loading from '../components/Loading';

function RouteAuth() {
  const {isAuth, user, loading} = useContext( UserContext );

  // Redirect authenticated users
  if ( isAuth ) {
    if ( loading ) return <Loading />;
    if ( user?.role === 'admin' ) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Unauthenticated users can access this route
  return <Outlet />;
}

export default RouteAuth;
