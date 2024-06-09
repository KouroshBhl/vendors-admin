import { HiOutlineTrash, HiOutlinePencilSquare } from 'react-icons/hi2';
import { IoDuplicateOutline } from 'react-icons/io5';

import { StyledActions, Button } from '../../ui/Actions';
import { deleteProduct } from '../../services/apiProducts';
import { useDeleteProduct } from './useDeleteProduct';
import Spinner from '../../ui/Spinner';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { Link } from 'react-router-dom';

function ProductsActions({ uniqueId, productType }) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useDeleteProduct(
    'Product',
    productType,
    deleteProduct,
    uniqueId
  );

  function handleClickProduct() {
    mutate({ uniqueId, productType });
    queryClient.invalidateQueries(['productsOptional', 'productsKey']);
  }

  if (isLoading) return <Spinner />;

  return (
    <StyledActions>
      <Modal>
        <Modal.Open opens='delete'>
          <Button variation='secondary'>
            <HiOutlineTrash />
          </Button>
        </Modal.Open>
        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName={`Product`}
            onConfirm={() => handleClickProduct()}
            disabled={isLoading}
          />
        </Modal.Window>
      </Modal>
      <Link to={`/products/${uniqueId}/edit`}>
        <HiOutlinePencilSquare />
      </Link>

      <Link to={`/products/${uniqueId}/duplicate`}>
        <IoDuplicateOutline />
      </Link>
    </StyledActions>
  );
}

export default ProductsActions;
