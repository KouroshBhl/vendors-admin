import { Divider } from '@nextui-org/react';

function Heading({ children }) {
  return (
    <div className='flex gap-8 items-center overflow-hidden mb-6'>
      <h1 className='text-2xl font-medium text-nowrap'>{children}</h1>
      <Divider />
    </div>
  );
}

export default Heading;
