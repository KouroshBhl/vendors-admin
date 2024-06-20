import { useForm } from 'react-hook-form';
import { useEditRates } from './useEditRates';
import Button from '../../ui/Button';

import Input from '../../ui/Input';

function EditRate({ rateId, setIdNotDisabled }) {
  const { isEditingProduct, mutateEditRate } = useEditRates();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    mutateEditRate({ data: data.price, id: rateId });
    setIdNotDisabled(null);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
      <Input
        type='number'
        {...register('price', {
          valueAsNumber: true,
          min: 1,
          required: true,
        })}
      />
      <Button>Save</Button>
      <Button onClick={() => setIdNotDisabled(null)}>Close</Button>
    </form>
  );
}

export default EditRate;
