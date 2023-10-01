import { Navigate } from 'react-router-dom';
import useAppContext from '../context';

interface Props {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAppContext();
  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
