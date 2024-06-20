import { HiOutlineTrash, HiOutlinePencilSquare } from 'react-icons/hi2';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CreateBrandForm from './CreateBrandForm';
import { useDeleteData } from '../../hooks/useDeleteData';
import { deleteBrand } from '../../services/apiBrands';
import { StyledActions, Button } from '../../ui/Actions';

function BrandsActions({ brandID, data }) {
  const { isLoading, mutate } = useDeleteData(
    'Brand',
    'brands',
    deleteBrand,
    brandID
  );

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
            resourceName={`${data.english_name} platform`}
            onConfirm={() => mutate(brandID)}
            disabled={isLoading}
          />
        </Modal.Window>

        <Modal.Open opens='edit'>
          <Button>
            <HiOutlinePencilSquare />
          </Button>
        </Modal.Open>

        <Modal.Window name='edit'>
          <CreateBrandForm editBrand={data} />
        </Modal.Window>
      </Modal>
    </StyledActions>
  );
}

export default BrandsActions;
