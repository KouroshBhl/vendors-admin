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
import ProductGiftcart from './ProductGiftcart';
import ProductOptional from './ProductOptional';
import { useCreateProductKey } from './useCreateProductKey';
import FileInput from '../../ui/FileInput';
import SpinnerMini from '../../ui/SpinnerMini';
import { styled } from 'styled-components';
import { useCreateProductOptional } from './useCreateProductOptional';
import { useEditProductKey } from './useEditProductKey';
import { useEditProductOptional } from './useEditProductOptional';

function CreateProductForm({ editProduct = {} }) {
  const { id: productId } = editProduct;
  const isEditSession = Boolean(productId);
  const { control, handleSubmit, register, formState, unregister, getValues } =
    useForm({
      defaultValues: isEditSession ? editProduct : '',
    });

  const [productType, setProductType] = useState('');
  const { status, mutateCreateProductKey } = useCreateProductKey();
  const { optinalStatus, mutateCreateProductOptional } =
    useCreateProductOptional();
  const { isEditingProductKey, mutateEditProdutKey } = useEditProductKey();
  const { isEditingProductOptional, mutateEditProdutOptional } =
    useEditProductOptional();
  const { errors } = formState;

  let isCreating = false;
  if (status === 'pending') isCreating = true;
  if (optinalStatus === 'pending') isCreating = true;
  if (isEditingProductKey === 'pending') isCreating = true;
  if (isEditingProductOptional === 'pending') isCreating = true;

  useEffect(
    function () {
      unregister('giftCardValues');
      unregister('selections');
    },
    [productType]
  );

  function onSubmit(data) {
    console.log(data);
    if (!isEditSession) {
      if (data.productType === 'productsKey')
        mutateCreateProductKey({ ...data, thumbnail: data?.thumbnail?.[0] });

      if (data.productType === 'productsOptional')
        mutateCreateProductOptional({
          ...data,
          thumbnail: data?.thumbnail?.[0],
        });
    } else {
      const image =
        typeof data.thumbnail === 'string'
          ? data.thumbnail
          : data?.thumbnail?.[0];

      if (editProduct.productType === 'productsKey') {
        mutateEditProdutKey({
          data: { ...data, thumbnail: image },
          id: editProduct.uniqueId,
        });
      } else {
        mutateEditProdutOptional({
          data: { ...data, thumbnail: image },
          id: editProduct.uniqueId,
        });
      }
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
        <Label>Select Categories *</Label>
        <FormRow>
          <SelectCategoryForm register={register} />
        </FormRow>

        <FormRow label='Select Platform *'>
          <SelectBrandForm register={register} />
        </FormRow>

        {!isEditSession && (
          <FormRow label='Product Type *'>
            <SelectProductType setProductType={setProductType} />
          </FormRow>
        )}

        {(productType === 'productsKey' ||
          editProduct.productType === 'productsKey') && <ProductGiftcart />}

        {(productType === 'productsOptional' ||
          editProduct.productType === 'productsOptional') && (
          <ProductOptional />
        )}

        <FormRow label='We buy this product directly?'>
          <StyledDirectBuy>
            <label htmlFor='direct'>Yes</label>
            <Input
              type='checkbox'
              id='direct'
              defaultValue={false}
              {...register('isDirectBuy', {
                value: true,
              })}
            />
          </StyledDirectBuy>
        </FormRow>

        <FormRow
          error={errors?.persianTitle?.message}
          label='Product Persian Title *'
        >
          <Input
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

        <FormRow
          error={errors?.description?.message}
          label='Product Description *'
        >
          <Textarea
            {...register('description', {
              required: 'This feild is required',
            })}
          />
        </FormRow>

        <FormRow label='Before Buy *' error={errors?.beforeBuy?.message}>
          <Textarea
            {...register('beforeBuy', {
              required: 'This feild is required',
            })}
          />
        </FormRow>

        <FormRow label='Product Thumbnail *' error={errors?.thumbnail?.message}>
          <FileInput {...register('thumbnail')} />
        </FormRow>

        <FormRow label='Note for Buyers'>
          <Textarea {...register('tips')} />
        </FormRow>

        <FormRow label='Note for other admins'>
          <Textarea {...register('adminNote')} />
        </FormRow>

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

const StyledDirectBuy = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;
