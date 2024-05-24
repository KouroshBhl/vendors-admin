import { styled } from 'styled-components';
import { HiOutlineTrash, HiOutlinePencilSquare } from 'react-icons/hi2';

import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CreateCategoryForm from './CreateCategoryForm';
import { useDeleteCategory } from './useDeleteCategory';
import { StyledActions, Button } from '../../ui/Actions';

function CategoriesActions({ categoryID, data }) {
  const { isLoading, mutate } = useDeleteCategory();

  if (isLoading) return <Spinner />;

  return (
    <StyledActions>
      <Modal>
        <Modal.Open opens='delete'>
          <Button>
            <HiOutlineTrash />
          </Button>
        </Modal.Open>
        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName={`category`}
            onConfirm={() => mutate(categoryID)}
          />
        </Modal.Window>

        <Modal.Open opens='edit'>
          <Button>
            <HiOutlinePencilSquare />
          </Button>
        </Modal.Open>

        <Modal.Window name='edit'>
          <CreateCategoryForm data={data} />
        </Modal.Window>
      </Modal>
    </StyledActions>
  );
}

export default CategoriesActions;
