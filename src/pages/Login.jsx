import { useNavigate } from 'react-router-dom';
import LoginForm from '../features/login/LoginForm';
import { useUser } from '../features/login/useUser';

function Login() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (isAuthenticated) navigate('/dashboard');

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Login;
