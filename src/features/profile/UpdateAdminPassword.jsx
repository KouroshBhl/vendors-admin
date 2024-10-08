import { useForm } from 'react-hook-form';
import Heading from '../../ui/Heading';
import { Button, Chip, Input } from '@nextui-org/react';
import { usePassword } from './useProfile';

function UpdateAdminPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isPending, updatePassword } = usePassword();

  function onSubmit(data) {
    updatePassword({ password: data.password });
  }

  return (
    <div className='flex flex-col gap-3'>
      <Heading as='h2'>Update Password</Heading>
      <Chip color='warning'>
        At least 8 characters long with one uppercase letter, one lowercase
        letter, one number, and one special character
      </Chip>
      <form
        className='grid grid-cols-2 gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          isInvalid={errors?.password?.message}
          errorMessage={errors?.password?.message}
          label='New Password'
          type='password'
          {...register('password', {
            required: 'Password is required',
            // minLength: {
            //   value: 8,
            //   message: 'Password must be at least 8 characters long',
            // },
            // pattern: {
            //   value:
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            //   message:
            //     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            // },
          })}
        />

        <Input
          label='Confirm Password'
          type='password'
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            // validate: (value) => value === password || 'Passwords do not match',
          })}
        />

        <Button type='submit' color='primary' isLoading={isPending}>
          {isPending ? 'Updating...' : ' Update password'}
        </Button>
      </form>
    </div>
  );
}

export default UpdateAdminPassword;
