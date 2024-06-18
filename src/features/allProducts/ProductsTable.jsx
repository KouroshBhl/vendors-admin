import { useFetchData } from '../../hooks/useFetchData';
import { getProducts } from '../../services/apiProducts';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import ProductRow from './ProductRow';

function ProductsTable() {
  const { data: allProducts, isLoading: productsLoading } = useFetchData(
    'product',
    getProducts
  );

  if (productsLoading) return <Spinner />;

  return (
    <Table columns='1fr 3fr 1fr 1fr'>
      <Table.Header>
        <div>Thumbnail</div>
        <div>Persian Title</div>
        <div>Type</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={allProducts}
        render={(product) => (
          <ProductRow key={product.uniqueId} allProducts={product} />
        )}
      />
    </Table>
  );
}

export default ProductsTable;
