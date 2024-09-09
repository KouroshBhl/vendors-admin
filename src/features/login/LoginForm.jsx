import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import Logo from '../../ui/Logo';
import { useLogin } from './useLogin';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isPending } = useLogin();

  function onSubmit(data) {
    login({ email: data.email, password: data.password });
  }

  return (
    <div className='bg-background h-screen flex flex-col gap-6 py-11'>
      <Logo />
      <h1 className='text-center text-2xl font-bold'>Login</h1>
      <form
        className='w-1/5 mx-auto flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          isInvalid={errors.email}
          errorMessage={errors.email?.message}
          label='Email'
          {...register('email', {
            required: 'Enter email address',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Enter a valid email address',
            },
          })}
        />
        <Input
          isInvalid={errors.password}
          errorMessage={errors.password?.message}
          type='password'
          label='Password'
          {...register('password', { required: 'Enter password' })}
        />
        <Button className='bg-primary' type='submit' isLoading={isPending}>
          {isPending ? 'Checking...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
