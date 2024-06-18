import ProductsTable from '../features/allProducts/ProductsTable';
import SearchProduct from '../features/allProducts/SearchProduct';
import Heading from '../ui/Heading';

function AllProducts() {
  return (
    <>
      <div className='flex flex-col gap-8'>
        <Heading as='h1'>All Products</Heading>
        <div>
          <div className='w-full grid grid-cols-[2fr,1fr,1fr] justify-between items-center'>
            <SearchProduct />
            <p>filter</p>
            <p>sort</p>
          </div>
        </div>
      </div>
      <ProductsTable />
    </>
  );
}

export default AllProducts;
