import { useParams, useSearchParams } from 'react-router-dom';
import { getProductDetails } from '../../services/apiProducts';
import Spinner from '../../ui/Spinner';
import CreateProductForm from '../products/CreateProductForm';
import { useGetProductDetail } from './useGetProductDetail';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

function EditProduct() {
  const queryClient = useQueryClient();
  const { productIdentify } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('productType');
  const { data, fetchStatus, isLoading, isFetching } = useGetProductDetail(
    `${type}Details`,
    getProductDetails,
    productIdentify,
    type
  );

  useEffect(function () {
    queryClient.resetQueries('productsOptionalDetails', 'productsKeyDetails');
  }, []);

  if (isLoading && isFetching) return <Spinner />;

  return (
    <StyledHeader>
      <h2>You are editing: {data.at(0).persianTitle}</h2>
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
