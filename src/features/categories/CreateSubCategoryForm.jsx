import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useCreateSubCategory } from './useCreateSubCategory';
import { useParams } from 'react-router-dom';
import { useEditSubCategory } from './useEditSubCategory';

function CreateSubCategoryForm({ onCloseModal, data = {} }) {
  const { id: catId, ...catData } = data;
  const isEditSession = Boolean(catId);

  const { errors, register, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? catData : {},
  });
  const { isCreatingSubCategory, mutateCreateSubCategory } =
    useCreateSubCategory();
  const { isEditingCategory, mutateEditCategory } = useEditSubCategory();

  const { subCategoryId } = useParams();
  const splitCategoryParam = subCategoryId.split('-');

  function onSubmit(data) {
    if (!isEditSession)
      mutateCreateSubCategory({
        ...data,
        rootCategory: splitCategoryParam.at(1),
      });
    else {
      mutateEditCategory({ newData: { ...data }, id: catId });
    }
    reset();
    onCloseModal();
  }

  return (
    <Form type='modal' onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Sub-Category English name'
        error={errors?.englishName?.message}
      >
        <Input
          type='text'
          id='englishName'
          {...register('englishName', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <FormRow
        label='Sub-Category Persian name'
        error={errors?.persianName?.message}
      >
        <Input
          type='text'
          id='persianName'
          {...register('persianName', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <Button disabled={isCreatingSubCategory || isEditingCategory}>
        Edit sub-category
      </Button>
    </Form>
  );
}

export default CreateSubCategoryForm;
