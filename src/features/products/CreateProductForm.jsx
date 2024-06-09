import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import { useForm, FormProvider } from 'react-hook-form';

import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import SelectCategoryForm from './SelectCategoryForm';
import Input from '../../ui/Input';
import SelectBrandForm from './SelectBrandForm';
import SelectProductType from './SelectProductType';
import ImageUploder from './ImageUploader';
import { useEffect, useState } from 'react';
import ProductOptional from './ProductOptional';
import FileInput from '../../ui/FileInput';
import SpinnerMini from '../../ui/SpinnerMini';
import { styled } from 'styled-components';
import { useCreateProduct } from './useCreateProduct';
import { useEditProduct } from './useEditProduct';
import ProductRegionCurrency from './ProductRegionCurrency';
import { useParams } from 'react-router-dom';
import ProductDescriptionEditor from './ProductDescriptionEditor';
import { useProductContext } from '../../context/product/productContext';
import { useDuplicateProduct } from './useDuplicateProduct';

function CreateProductForm({ editProduct = {} }) {
  let searchParams = useParams();
  const actionType = searchParams?.action;
  const { dispatch, uniqueId } = useProductContext();

  useEffect(() => {
    dispatch({
      type: 'SET_UUID',
      payload: { uniqueId: editProduct?.uniqueId, actionType },
    });
  }, []);

  const { uniqueId: productId } = editProduct;
  const isEditSession = Boolean(productId);
  const { control, handleSubmit, register, formState, unregister, getValues } =
    useForm({
      defaultValues: isEditSession ? editProduct : '',
    });

  const [productType, setProductType] = useState('');
  const [productGallery, setProductGallery] = useState(
    editProduct.gallery || []
  );

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
    console.log(productGallery);
    const summary = data.summary
      ? data.summary
      : data.description.text.substring(0, 150);

    if (!isEditSession) {
      mutateCreateProduct({
        ...data,
        uniqueId,
        description: data?.description?.json,
        summary,
        gallery: productGallery,
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
          gallery: productGallery,
          summary,
          uniqueId,
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
        gallery: productGallery,
        thumbnail: image,
        summary,
        description: data?.description?.json,
      });
    }
  }
  // console.log(uniqueId);

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

        <FormRow label='Region & Currency'>
          <ProductRegionCurrency />
        </FormRow>

        <FormRow label='Product Price*' error={errors?.price?.message}>
          <Input
            placeholder='price'
            type='number'
            step='any'
            {...register('price', {
              valueAsNumber: true,
              required: 'This feild is required',
            })}
          />
        </FormRow>

        <FormRow label='Product Price in discount'>
          <StyledDirectBuy>
            <Input
              placeholder='discount'
              type='number'
              step='any'
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
              step='any'
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
              step='any'
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
              placeholder='Min devlivery time'
              type='number'
              id='deliveryTime'
              defaultValue={isEditSession ? editProduct.minDeliveryTime : ''}
              defaultChecked={
                isEditSession ? editProduct.isDirectBuy === false : true
              }
              {...register('minDeliveryTime', {
                valueAsNumber: true,
              })}
            />

            <Input
              defaultValue={isEditSession ? editProduct.maxDeliveryTime : ''}
              placeholder='Max delivery time'
              type='number'
              id='deliveryTime'
              defaultChecked={
                isEditSession ? editProduct.isDirectBuy === false : true
              }
              {...register('maxDeliveryTime', {
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

        <FormRow label='Product Thumbnail *' error={errors?.thumbnail?.message}>
          <FileInput {...register('thumbnail')} />
        </FormRow>

        <FormRow label='Before Buy' error={errors?.beforeBuy?.message}>
          <Textarea {...register('productNote')} dir='rtl' />
        </FormRow>

        <FormRow label='Product purchase link'>
          <Input
            placeholder='Https://example.com'
            type='text'
            {...register('purchaseLink')}
          />
        </FormRow>

        <FormRow label='Note for Buyers'>
          <Textarea {...register('tips')} dir='rtl' />
        </FormRow>

        <FormRow label='Note for other admins'>
          <Textarea {...register('adminNote')} />
        </FormRow>

        <FormRow label='Product summary'>
          <Textarea {...register('summary')} />
        </FormRow>

        <ImageUploder
          setProductGallery={setProductGallery}
          imagesGallery={editProduct?.gallery}
          productGallery={productGallery}
          uuId={editProduct?.uniqueId || uniqueId}
        />

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

const StyledDirectBuy = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;
