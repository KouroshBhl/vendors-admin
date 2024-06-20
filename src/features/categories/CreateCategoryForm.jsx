import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useCreateCategory } from './useCreateCategory';
import { useEditCategory } from './useEditCategory';

function CreateCategoryForm({ onCloseModal, data = {} }) {
  const { id: catId, ...catData } = data;
  const isEditSession = Boolean(catId);
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? catData : {},
  });
  const errors = formState;
  const { isCreatingCategory, mutateCreateCategory } = useCreateCategory();
  const { isEditingCategory, mutateEditCategory } = useEditCategory();

  function onSubmit(data) {
    if (!isEditSession) {
      mutateCreateCategory({ ...data });
    } else {
      mutateEditCategory({ newData: { ...data }, id: catId });
    }
    reset();
    onCloseModal();
  }

  return (
    <Form type='modal' onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Category English name'
        error={errors?.english_name?.message}
      >
        <Input
          type='text'
          id='englishName'
          {...register('english_name', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <FormRow
        label='Category Persian name'
        error={errors?.persian_name?.message}
      >
        <Input
          type='text'
          id='persianName'
          {...register('persian_name', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <Button disabled={isCreatingCategory || isEditingCategory}>
        {isEditSession ? 'Edit root category' : 'Add root category'}
      </Button>
    </Form>
  );
}

export default CreateCategoryForm;
