import { useDeleteSubCategory } from './useDeleteSubCategory';

import { HiOutlineTrash, HiOutlinePencilSquare } from 'react-icons/hi2';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CreateSubCategoryForm from './CreateSubCategoryForm';
import { StyledActions, Button } from '../../ui/Actions';

function CategoriesActions({ categoryID, data }) {
  const { isLoading, mutate } = useDeleteSubCategory();

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
          <CreateSubCategoryForm data={data} />
        </Modal.Window>
      </Modal>
    </StyledActions>
  );
}

export default CategoriesActions;
