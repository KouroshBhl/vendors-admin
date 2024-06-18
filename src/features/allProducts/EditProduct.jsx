import { useParams, useSearchParams } from 'react-router-dom';
import { getProductDetails } from '../../services/apiProducts';
import Spinner from '../../ui/Spinner';
import CreateProductForm from '../products/CreateProductForm';
import { useGetProductDetail } from './useGetProductDetail';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import Heading from '../../ui/Heading';

function EditProduct() {
  const queryClient = useQueryClient();
  const { productIdentify } = useParams();
  const { data, isLoading, isFetching } = useGetProductDetail(
    `productDetails`,
    getProductDetails,
    productIdentify
  );

  useEffect(function () {
    queryClient.resetQueries('productDetails');
  }, []);

  if (isLoading && isFetching) return <Spinner />;

  return (
    <StyledHeader>
      <Heading as='h2'>
        You are editing:
        <span className='text-3xl'>{data.at(0).englishTitle}</span>
      </Heading>
      <CreateProductForm editProduct={data.at(0)} />
    </StyledHeader>
  );
}

export default EditProduct;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
