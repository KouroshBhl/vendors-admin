import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import Logo from '../../ui/Logo';
import { useLogin } from './useLogin';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import toast from 'react-hot-toast';
import { useState } from 'react';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { login, isPending } = useLogin();
  const [hcaptchaToken, setHcaptchaToken] = useState(null);

  function onSubmit(data) {
    // if (!hcaptchaToken) {
    //   toast.error('Please complete the captcha');
    //   return;
    // }
    login({ email: data.email, password: data.password });
  }

  function onHCaptchaVerify(token) {
    setHcaptchaToken(token);
    setValue('hcaptchaToken', token);
  }

  return (
    <div className='flex absolute w-full z-10 max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small top-1/2 -translate-y-2/3'>
      <Logo />
      <h2 className='text-center text-xl font-normal'>Login | Vendors</h2>
      <form
        className='w-full mx-auto flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          isInvalid={errors.email}
          errorMessage={errors.email?.message}
          variant='bordered'
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
          variant='bordered'
          type='password'
          label='Password'
          {...register('password', { required: 'Enter password' })}
        />
        {/* <HCaptcha
          sitekey={import.meta.env.VITE_HCAPTCHA_SECRET_KEY}
          onVerify={onHCaptchaVerify}
        /> */}

        <Button className='bg-primary' type='submit' isLoading={isPending}>
          {isPending ? 'Checking...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
