import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateSubCategoryForm from './CreateSubCategoryForm';

function AddSubCategory() {
  return (
    <Modal>
      <Modal.Open>
        <div>
          <Button>Add sub-category</Button>
        </div>
      </Modal.Open>

      <Modal.Window>
        <CreateSubCategoryForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddSubCategory;
