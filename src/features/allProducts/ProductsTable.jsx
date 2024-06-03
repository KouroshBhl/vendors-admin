import { useFetchData } from '../../hooks/useFetchData';
import { getProducts } from '../../services/apiProducts';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import ProductRow from './ProductRow';

function ProductsTable() {
  const { data: allProducts, isLoading: productsLoading } = useFetchData(
    'products',
    getProducts
  );

  if (productsLoading) return <Spinner />;

  return (
    <Table columns='1fr 3fr 1fr 1fr 1fr'>
      <Table.Header>
        <div>Thumbnail</div>
        <div>Persian Title</div>
        <div>Price</div>
        <div>Product Type</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={allProducts.products}
        render={(allProducts) => (
          <ProductRow key={allProducts.uniqueId} allProducts={allProducts} />
        )}
      />
    </Table>
  );
}

export default ProductsTable;
