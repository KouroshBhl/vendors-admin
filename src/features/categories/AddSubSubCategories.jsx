import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CreateSubSubCategoryForm from './CreateSubSubCategoryForm';

function AddSubSubCategories() {
  return (
    <Modal>
      <Modal.Open>
        <div>
          <Button>Add new sub-category</Button>
        </div>
      </Modal.Open>
      <Modal.Window>
        <CreateSubSubCategoryForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddSubSubCategories;
