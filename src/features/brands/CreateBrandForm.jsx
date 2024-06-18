import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useCreateBrand } from './useCreateBrand';
import FileInput from '../../ui/FileInput';
import { useEditBrand } from './useEditBrand';

function CreateBrandForm({ onCloseModal, editBrand = {} }) {
  const { id: brandID, ...editBrandData } = editBrand;
  const isEditSession = Boolean(brandID);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editBrandData : {},
  });
  const { isCreatingBrand, mutateCreateBrand } = useCreateBrand();
  const { mutateEditBrand, idEditingBrand } = useEditBrand();
  const { errors } = formState;

  function onSubmit(data) {
    const image =
      typeof data.brandLogo === 'string'
        ? data.brandLogo
        : data?.brandLogo?.[0];
    const formatData = {
      slugName: data.englishName.toLowerCase().replaceAll(' ', '-'),
      ...data,
    };

    if (isEditSession) {
      mutateEditBrand({
        newBrandData: { ...formatData, brandLogo: image },
        id: brandID,
      });
    } else {
      mutateCreateBrand({ ...formatData, brandLogo: image });
    }
    reset();
    onCloseModal?.();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type='modal'>
      <FormRow label='Brand English name' error={errors?.englishName?.message}>
        <Input
          type='text'
          id='englishName'
          {...register('englishName', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <FormRow label='Brand Persian name' error={errors?.persianName?.message}>
        <Input
          type='text'
          id='persianName'
          {...register('persianName', {
            required: 'This feild is required',
          })}
        />
      </FormRow>

      <FormRow label='Brand description' error={errors?.description?.message}>
        <Input
          type='text'
          id='description'
          {...register('description', {
            required: false,
          })}
        />
      </FormRow>

      <FormRow
        label='Brand description (Perisan)'
        error={errors?.brandLogo?.message}
      >
        <FileInput
          id='brandLogo'
          accept='image/*'
          {...register('brandLogo', {
            required: isEditSession ? false : 'This feild is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isCreatingBrand || idEditingBrand}>
          {isEditSession ? 'Edit brand' : 'Add new brand'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBrandForm;
