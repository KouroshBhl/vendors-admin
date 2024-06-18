import Table from '../../ui/Table';
import { Img, Name } from '../../ui/TableRowUi';
import ProductsActions from './ProductsActions';

function ProductRow({ allProducts }) {
  const { persianTitle, thumbnail, id, productType } = allProducts;

  return (
    <Table.Row>
      <Img src={thumbnail} alt={persianTitle} />
      <Name>{persianTitle}</Name>
      <span className='text-2xl font-semibold uppercase'>{productType}</span>
      <ProductsActions id={id} productType={productType} />
    </Table.Row>
  );
}

export default ProductRow;
