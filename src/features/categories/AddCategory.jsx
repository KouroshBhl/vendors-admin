import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CreateCategoryForm from './CreateCategoryForm';

function AddCategory() {
  return (
    <Modal>
      <Modal.Open>
        <Button>Add new category</Button>
      </Modal.Open>

      <Modal.Window>
        <CreateCategoryForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCategory;
