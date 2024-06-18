import { supabaseUrl } from '../../services/supabase';
import { StyledActions } from '../../ui/Actions';
import Table from '../../ui/Table';
import { Img, Name } from '../../ui/TableRowUi';
import ProductsActions from './ProductsActions';

function ProductRow({ allProducts }) {
  const { persianTitle, thumbnail, productType, uniqueId, price } = allProducts;

  return (
    <Table.Row>
      <Img src={thumbnail} alt={persianTitle} />
      <Name>{persianTitle}</Name>
      <Name>{price}</Name>
      <span className='text-2xl font-semibold uppercase'>{productType}</span>
      <ProductsActions uniqueId={uniqueId} productType={productType} />
    </Table.Row>
  );
}

export default ProductRow;
