import { useFetchData } from '../../hooks/useFetchData';
import { getProducts } from '../../services/apiProducts';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import ProductRow from './ProductRow';

function ProductsTable() {
  const { data: productsKeyData, isLoading: productsKeyLoading } = useFetchData(
    'productsKey',
    getProducts
  );

  const { data: productsOptionalData, isLoading: productsOptionalLoading } =
    useFetchData('productsOptional', getProducts);

  if (productsKeyLoading || productsOptionalLoading) return <Spinner />;

  const { productsKey } = productsKeyData;
  const { productOptional } = productsOptionalData;

  // if (!productsKey || !productOptional) return;
  const allProducts = productsKey.concat(productOptional);

  return (
    <Table columns='1fr 3fr 1fr 1fr'>
      <Table.Header>
        <div>Thumbnail</div>
        <div>Persian Title</div>
        <div>Product Type</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={allProducts}
        render={(allProducts) => (
          <ProductRow key={allProducts.uniqueId} allProducts={allProducts} />
        )}
      />
    </Table>
  );
}

export default ProductsTable;
