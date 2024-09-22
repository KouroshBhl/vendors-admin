import { Spinner } from '@nextui-org/react';
import { useUser } from '../features/login/useUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isPending, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate('/login');
  }, [isAuthenticated, isPending, navigate]);

  if (isPending)
    return (
      <div className='w-full h-screen bg-background flex justify-center items-center'>
        <Spinner size='lg' label='Loading...' />
      </div>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;