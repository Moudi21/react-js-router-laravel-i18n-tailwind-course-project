// ProtectedRoute.jsx
import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router';
import {UserContext} from '../contexts/UserProvider';
import Loading from '../components/Loading';

const ProtectedRoute = ( {role} ) => {
  const {isAuth, user, loading} = useContext( UserContext );


  if ( !isAuth && loading ) return <Loading />;
  if ( !isAuth && !user ) return <Navigate to="/login" />;
  if ( role && user?.role === role ) return <Outlet />;
  if ( !role && isAuth ) return <Outlet />;

  return <Navigate to="/" />;

};

export default ProtectedRoute;