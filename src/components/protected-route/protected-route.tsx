import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type Props = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
};

const ProtectedRoute = ({ children, onlyUnAuth = false }: Props) => {
  const location = useLocation();
  const isAuth = useSelector((s) => s.auth.isAuth);

  if (onlyUnAuth && isAuth) return <Navigate to='/' replace />;
  if (!onlyUnAuth && !isAuth)
    return <Navigate to='/login' state={{ from: location }} replace />;

  return children;
};

export default ProtectedRoute;