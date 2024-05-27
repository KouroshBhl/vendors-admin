import ProductsTable from '../features/allProducts/ProductsTable';
import Heading from '../ui/Heading';

function AllProducts() {
  return (
    <>
      <div>
        <Heading as='h1'>All Products</Heading>
      </div>
      <ProductsTable />
    </>
  );
}

export default AllProducts;
