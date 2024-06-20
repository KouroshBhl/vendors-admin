import { HiOutlineTrash, HiOutlinePencilSquare } from 'react-icons/hi2';

import { StyledActions, Button } from '../../ui/Actions';
import { deleteProduct } from '../../services/apiProducts';
import { useDeleteProduct } from './useDeleteProduct';
import Spinner from '../../ui/Spinner';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { Link } from 'react-router-dom';

function ProductsActions({ id, productType }) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useDeleteProduct(
    'product',
    productType,
    deleteProduct,
    id
  );

  function handleClickProduct() {
    mutate({ id, productType });
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
      <Link to={`/products/${id}/edit`}>
        <HiOutlinePencilSquare />
      </Link>
    </StyledActions>
  );
}

export default ProductsActions;
