import { useNavigate } from 'react-router-dom';
import LoginForm from '../features/login/LoginForm';
import { useUser } from '../hooks/useUser';

function Login() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (isAuthenticated) navigate('/dashboard');

  return (
    <div className='flex w-screen items-start justify-center overflow-hidden bg-content1 p-2 sm:p-4 lg:p-8  h-full fixed'>
      <LoginForm />
    </div>
  );
}

export default Login;
