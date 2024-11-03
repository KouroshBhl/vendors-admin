import { Button, Input, Spinner } from '@nextui-org/react';
import { useUser } from '../login/useUser';
import { useForm } from 'react-hook-form';
import { useProfile } from './useProfile';
import UpdateAdminPassword from './UpdateAdminPassword';

function EditInfo() {
  const { isPending, user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ ...user?.user_metadata });

  if (isPending) return <Spinner />;

  const { isPending: updating, updateUser } = useProfile();

  function onSubmit(data) {
    updateUser(data);
  }

  return (
    <div className='flex flex-col gap-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-2 gap-4 items-center'
      >
        <Input isDisabled value={user?.email} label='Email' />
        <Input isDisabled value={user?.role} label='Role' />

        <Input
          defaultValue={user?.user_metadata?.firstName}
          errorMessage={errors?.firstName?.message}
          isInvalid={errors?.firstName}
          type='text'
          label='First name'
          {...register('firstName', {
            required: 'First name is required',
          })}
        />

        <Input
          defaultValue={user?.user_metadata?.lastName}
          errorMessage={errors?.lastName?.message}
          isInvalid={errors?.lastName}
          type='text'
          label='Last name'
          {...register('lastName', {
            required: 'Last name is required',
          })}
        />

        <Input
          type='number'
          defaultValue={user?.user_metadata?.phoneNumber}
          errorMessage={errors?.phoneNumber?.message}
          isInvalid={errors?.phoneNumber}
          label='Phone number'
          {...register('phoneNumber', {
            required: 'Phone number is required',
          })}
        />

        <Input
          errorMessage={errors?.address?.message}
          defaultValue={user?.user_metadata?.address}
          isInvalid={errors?.address}
          type='text'
          label='Address'
          {...register('address', {
            required: 'address is required',
          })}
        />

        <Input
          errorMessage={errors?.profilePicture?.message}
          isInvalid={errors?.profilePicture}
          type='file'
          label='Profile picture'
          {...register('profilePicture')}
        />

        <Button
          type='submit'
          className=' text-lg'
          color='primary'
          isLoading={updating}
        >
          {updating ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
      <UpdateAdminPassword />
    </div>
  );
}

export default EditInfo;
