import { useDeleteData } from '../../hooks/useDeleteData';
import { deleteHomePageFeature } from '../../services/apiUI';
import { HiOutlineTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';

function HomePageFeatureDelete({ id }) {
  const { isLoading, mutate } = useDeleteData(
    'Feature',
    'homePageFeatures',
    deleteHomePageFeature,
    id
  );
  return (
    <div className='hover:cursor-pointer hover:text-red-700'>
      <Modal>
        <Modal.Open opens='delete'>
          <HiOutlineTrash className='w-8 h-8' />
        </Modal.Open>
        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName={`feature`}
            onConfirm={() => mutate(id)}
            disabled={isLoading}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default HomePageFeatureDelete;
