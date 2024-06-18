import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import { useForm, FormProvider } from 'react-hook-form';

import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import SelectCategoryForm from './SelectCategoryForm';
import Input from '../../ui/Input';
import SelectBrandForm from './SelectBrandForm';
import SelectProductType from './SelectProductType';
import { useEffect, useState } from 'react';
import ProductOptional from './ProductOptional';
import FileInput from '../../ui/FileInput';
import SpinnerMini from '../../ui/SpinnerMini';
import { styled } from 'styled-components';
import { useCreateProduct } from './useCreateProduct';
import { useEditProduct } from './useEditProduct';
import { useParams } from 'react-router-dom';
import ProductDescriptionEditor from './ProductDescriptionEditor';
import { useDuplicateProduct } from './useDuplicateProduct';
import ImageUploader from './ImageUploader';

function CreateProductForm({ editProduct = {} }) {
  let searchParams = useParams();
  const actionType = searchParams?.action;

  const { uniqueId: productId } = editProduct;
  const isEditSession = Boolean(productId);
  const { control, handleSubmit, register, formState, unregister, getValues } =
    useForm({
      defaultValues: isEditSession ? editProduct : '',
    });

  const [productType, setProductType] = useState('');

  const { status, mutateCreateProduct } = useCreateProduct();
  const { isEditingProduct, mutateEditProduct } = useEditProduct();
  const { isDuplicating, mutateDuplicateProduct } = useDuplicateProduct();
  const { errors } = formState;

  let isCreating = false;
  if (status === 'pending') isCreating = true;
  if (isEditingProduct === 'pending') isCreating = true;

  useEffect(
    function () {
      unregister('giftCardValues');
      unregister('selections');
    },
    [productType]
  );

  function onSubmit(data) {
    if (!isEditSession) {
      mutateCreateProduct({
        ...data,
        description: data?.description?.json,
        thumbnail: data?.thumbnail?.[0],
      });
    } else if (isEditSession && actionType === 'duplicate') {
      const image =
        typeof data.thumbnail === 'string'
          ? data.thumbnail
          : data?.thumbnail?.[0];

      mutateDuplicateProduct({
        data: {
          ...data,
          description: data?.description?.json,
          thumbnail: image,
        },
        duplicatingId: searchParams?.productIdentify,
      });
    } else if (isEditSession && actionType === 'edit') {
      const image =
        typeof data.thumbnail === 'string'
          ? data.thumbnail
          : data?.thumbnail?.[0];

      mutateEditProduct({
        ...data,
        thumbnail: image,
        description: data?.description?.json,
      });
    }
  }

  return (
    <FormProvider
      register={register}
      unregister={unregister}
      getValues={getValues}
      editProduct={editProduct}
      isEditSession={isEditSession}
      control={control}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          error={errors?.persianTitle?.message}
          label='Product Persian Title *'
        >
          <Input
            dir='rtl'
            {...register('persianTitle', {
              required: 'This feild is required',
            })}
          />
        </FormRow>

        <FormRow
          error={errors?.englishTitle?.message}
          label='Product English Title *'
        >
          <Input
            {...register('englishTitle', {
              required: 'This feild is required',
            })}
          />
        </FormRow>

        <Label>Select product type *</Label>
        <FormRow>
          <SelectProductType setProductType={setProductType} />
        </FormRow>

        <Label>Select Categories *</Label>
        <FormRow>
          <SelectCategoryForm register={register} />
        </FormRow>

        <Label>Select Platform *</Label>
        <FormRow>
          <SelectBrandForm register={register} />
        </FormRow>

        <Label htmlFor='directYes' className='font-medium mb-2'>
          Info need from buyer
        </Label>

        <ProductOptional />

        <FormRow label='Product Thumbnail *' error={errors?.thumbnail?.message}>
          <FileInput {...register('thumbnail')} />
        </FormRow>

        <FormRow label='Product Note' error={errors?.beforeBuy?.message}>
          <Textarea {...register('productNote')} dir='rtl' />
        </FormRow>

        <FormRow label='Product purchase link'>
          <Input
            placeholder='Https://example.com'
            type='text'
            {...register('purchaseLink')}
          />
        </FormRow>

        <ImageUploader />

        <ProductDescriptionEditor
          defaultValue={
            isEditSession ? editProduct.description : 'اینجا بنویسید'
          }
        />

        <FormRow>
          <Button
            size='large'
            disabled={isCreating}
            type='loading'
            loading={isCreating ? 'loading' : ''}
          >
            {!isEditSession
              ? isCreating
                ? 'Creating/Uploading...'
                : 'Create new product'
              : actionType == 'duplicate'
                ? 'Duplicate Product'
                : 'Edit Product'}

            {isCreating && <SpinnerMini />}
          </Button>
        </FormRow>
      </Form>
    </FormProvider>
  );
}

export default CreateProductForm;

const Label = styled.label`
  font-weight: 500;
`;
