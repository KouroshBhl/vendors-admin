import CreateBrandForm from '../features/brands/CreateBrandForm';
import Button from './Button';
import Modal from './Modal';

function AddBrand() {
  return (
    <Modal>
      <Modal.Open opens='add-brand'>
        <Button size='large'>Add new brand</Button>
      </Modal.Open>
      <Modal.Window name='add-brand'>
        <CreateBrandForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddBrand;
