import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import FileInput from '../../ui/FileInput';
import Button from '../../ui/Button';
import { useCreateHomePageFeature } from './useCreateHomePageFeature';

function HomePageFeatures() {
  const { register, handleSubmit, reset } = useForm();
  const { mutateHomePageFeature, status } = useCreateHomePageFeature();

  function onSubmit(data) {
    mutateHomePageFeature({ ...data, image: data.image[0] });
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Feature title'>
        <Input
          type='text'
          id='name'
          {...register('name', {
            required: 'This feild is required',
          })}
        />
      </FormRow>
      <FormRow label='Link'>
        <Input
          type='text'
          id='link'
          {...register('link', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <FormRow label='Image'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <Button disabled={status === 'pending'}>
        {status === 'pending' ? 'Creating...' : 'Create feature'}
      </Button>
    </Form>
  );
}

export default HomePageFeatures;
