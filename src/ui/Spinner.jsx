import { Spinner } from '@nextui-org/react';

export default function FullSpinner() {
  return (
    <div className='flex justify-center items-center w-full min-h-[400px]'>
      <Spinner size='large' />
    </div>
  );
}
