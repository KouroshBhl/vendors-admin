import Table from '../../ui/Table';
import { Img, Name } from '../../ui/TableRowUi';
import ProductsActions from './ProductsActions';

function ProductRow({ allProducts }) {
  const { persian_title, thumbnail, id, product_type } = allProducts;

  return (
    <Table.Row>
      <Img src={thumbnail} alt={persian_title} />
      <Name>{persian_title}</Name>
      <span className='text-2xl font-semibold uppercase'>{product_type}</span>
      <ProductsActions id={id} productType={product_type} />
    </Table.Row>
  );
}

export default ProductRow;
