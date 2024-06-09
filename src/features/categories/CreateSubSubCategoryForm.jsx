import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useParams } from 'react-router-dom';
import { useCreateSubSubCategory } from './useCreateSubSubCategory';
import { useEditSubSubCategory } from './useEditSubSubCategory';

function CreateSubSubCategoryForm({ onCloseModal, data = {} }) {
  const { id: catId, ...catData } = data;
  const isEditSession = Boolean(catId);

  const { errors, register, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? catData : {},
  });
  const { isCreatingSubSubCategory, mutateCreateSubSubCategory } =
    useCreateSubSubCategory();
  const { isEditingCategory, mutateEditCategory } = useEditSubSubCategory();

  const { subSubCategoryId } = useParams();
  const splitCategoryParam = subSubCategoryId.split('-');

  function onSubmit(data) {
    if (!isEditSession)
      mutateCreateSubSubCategory({
        ...data,
        // rootCategory: splitCategoryParam.at(1),
        subCategory1: splitCategoryParam.at(1),
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

      <Button disabled={isCreatingSubSubCategory}>Add new sub-category</Button>
    </Form>
  );
}

export default CreateSubSubCategoryForm;
