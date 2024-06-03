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
import ProductRegionCurrency from './ProductRegionCurrency';

function CreateProductForm({ editProduct = {}, duplicateProduct = {} }) {
  const { id: productId } = editProduct;
  const isEditSession = Boolean(productId);
  const { control, handleSubmit, register, formState, unregister, getValues } =
    useForm({
      defaultValues: isEditSession ? editProduct : '',
    });

  const [productType, setProductType] = useState('');
  const { status, mutateCreateProduct } = useCreateProduct();

  const { isEditingProduct, mutateEditProduct } = useEditProduct();

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
    console.log(data);
    const title = data.persianTitle.replaceAll(' ', '-');
    const date = Date.now();
    const slug = `${title}-${date}`;
    console.log(slug);
    if (!isEditSession) {
      mutateCreateProduct({
        ...data,
        slug,
        thumbnail: data?.thumbnail?.[0],
      });
    } else {
      const image =
        typeof data.thumbnail === 'string'
          ? data.thumbnail
          : data?.thumbnail?.[0];

      mutateEditProduct({
        data: { ...data, thumbnail: image },
        id: editProduct.uniqueId,
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
        <Label>Select Categories *</Label>
        <FormRow>
          <SelectCategoryForm register={register} />
        </FormRow>

        {/* <FormRow>
          <pre>{JSON.stringify(editor.getJSON(), null, 2)}</pre>
        </FormRow> */}

        <FormRow label='Select Platform *'>
          <SelectBrandForm register={register} />
        </FormRow>

        <FormRow label='Region & Currency'>
          <ProductRegionCurrency />
        </FormRow>

        <FormRow label='Product Price*' error={errors?.price?.message}>
          <Input
            placeholder='price'
            type='number'
            {...register('price', {
              valueAsNumber: true,
              required: 'This feild is required',
            })}
          />
        </FormRow>

        <FormRow label='Product Price discount'>
          <StyledDirectBuy>
            <Input
              placeholder='discount'
              type='number'
              {...register('discount', {
                valueAsNumber: true,
              })}
            />

            <label htmlFor='isPercentage'>is Percentage (%) ?</label>
            <Input
              id='isPercentage'
              placeholder='discount'
              type='checkbox'
              {...register('isDiscountPercentage', {
                value: true,
              })}
            />
          </StyledDirectBuy>
        </FormRow>

        <FormRow label='Product coupon discount'>
          <StyledDirectBuy>
            <Input
              placeholder='coupon'
              type='number'
              {...register('coupon', {
                valueAsNumber: true,
              })}
            />

            <label htmlFor='discount'>is Percentage (%) ?</label>
            <Input
              id='discount'
              placeholder='discount'
              type='checkbox'
              {...register('isCouponPercentage', {
                value: true,
              })}
            />
          </StyledDirectBuy>
        </FormRow>

        <FormRow label='Product extra'>
          <StyledDirectBuy>
            <Input
              placeholder='extra'
              type='number'
              {...register('extra', {
                valueAsNumber: true,
              })}
            />

            <label htmlFor='extra'>is Percentage (%) ?</label>
            <Input
              id='extra'
              placeholder='extra'
              type='checkbox'
              {...register('isExtraPercentage', {
                value: true,
              })}
            />
          </StyledDirectBuy>
        </FormRow>

        {!isEditSession && (
          <FormRow label='Product Type *'>
            <SelectProductType setProductType={setProductType} />
          </FormRow>
        )}

        <FormRow label='Is instatly deliver?'>
          <StyledDirectBuy>
            <label htmlFor='instantYes'>Yes</label>
            <Input
              defaultValue={true}
              radioGroup='instantlyDevliver'
              defaultChecked={
                isEditSession ? editProduct.isDirectBuy === true : false
              }
              type='radio'
              id='instantYes'
              {...register('isInstantlyDeliver', {
                value: true,
              })}
            />

            <label htmlFor='instantNo'>No</label>
            <Input
              defaultValue={false}
              radioGroup='instantlyDevliver'
              type='radio'
              id='instantNo'
              defaultChecked={
                isEditSession ? editProduct.isDirectBuy === false : true
              }
              {...register('isInstantlyDeliver', {
                value: false,
              })}
            />

            <label htmlFor='deliveryTime'>Delivery time (min)</label>
            <Input
              placeholder='Number only'
              type='number'
              id='deliveryTime'
              defaultChecked={
                isEditSession ? editProduct.isDirectBuy === false : true
              }
              {...register('deliveryTime', {
                valueAsNumber: true,
              })}
            />
          </StyledDirectBuy>
        </FormRow>

        {/* {(productType === 'productsKey' ||
          editProduct.productType === 'productsKey') && <ProductGiftcart />}

        {(productType === 'productsOptional' ||
          editProduct.productType === 'productsOptional') && (
          <ProductOptional />
        )} */}

        <label htmlFor='directYes' className='font-medium mb-2'>
          Info need from buyer
        </label>

        <ProductOptional />

        <FormRow label='We buy this product directly?'>
          <StyledDirectBuy>
            <label htmlFor='directYes'>Yes</label>
            <Input
              defaultValue={true}
              radioGroup='directBuy'
              defaultChecked={
                isEditSession ? editProduct.isDirectBuy === true : false
              }
              type='radio'
              id='directYes'
              {...register('isDirectBuy', {
                value: true,
              })}
            />

            <label htmlFor='directNo'>No</label>
            <Input
              defaultValue={false}
              radioGroup='directBuy'
              type='radio'
              id='directNo'
              defaultChecked={
                isEditSession ? editProduct.isDirectBuy === false : true
              }
              {...register('isDirectBuy', {
                value: false,
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

        <FormRow label='Product Thumbnail *' error={errors?.thumbnail?.message}>
          <FileInput {...register('thumbnail')} />
        </FormRow>

        <FormRow label='Before Buy' error={errors?.beforeBuy?.message}>
          <Textarea {...register('productNote')} />
        </FormRow>

        <FormRow label='Product purchase link'>
          <Input
            placeholder='Https://example.com'
            type='text'
            {...register('purchaseLink')}
          />
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
