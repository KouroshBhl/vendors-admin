import EditProduct from '../features/allProducts/EditProduct';
import CreateProductForm from '../features/products/CreateProductForm';
import Heading from '../ui/Heading';

function AddProduct() {
  return (
    <>
      <Heading as='h1'>Create New Product</Heading>
      <CreateProductForm />
    </>
  );
}

export default AddProduct;
