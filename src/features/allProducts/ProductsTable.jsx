import { useEffect } from 'react';
import { useProductContext } from '../../context/product/productContext';
import { useFetchData } from '../../hooks/useFetchData';
import { getProducts } from '../../services/apiProducts';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import ProductRow from './ProductRow';

function ProductsTable() {
  const { dispatch, productsTable } = useProductContext();
  const { data: allProducts, isLoading: productsLoading } = useFetchData(
    'products',
    getProducts
  );

  useEffect(() => {
    if (productsLoading) return;
    dispatch({ type: 'SET_PRODUCTS_TABLE', payload: allProducts });
  }, [allProducts]);

  if (productsLoading) return <Spinner />;

  return (
    <Table columns='1fr 3fr 1fr 1fr 1fr'>
      <Table.Header>
        <div>Thumbnail</div>
        <div>Persian Title</div>
        <div>Price</div>
        <div>Type</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={productsTable}
        render={(product) => (
          <ProductRow key={product.uniqueId} allProducts={product} />
        )}
      />
    </Table>
  );
}

export default ProductsTable;
