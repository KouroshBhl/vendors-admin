import { StyledActions } from '../../ui/Actions';
import Table from '../../ui/Table';
import { Img, Name } from '../../ui/TableRowUi';
import ProductsActions from './ProductsActions';
import { HiOutlineKey } from 'react-icons/hi2';
import { HiOutlineListBullet } from 'react-icons/hi2';

function ProductRow({ allProducts }) {
  const { persianTitle, thumbnail, productType, uniqueId } = allProducts;
  return (
    <Table.Row>
      <Img src={thumbnail} alt={persianTitle} />
      <Name>{persianTitle}</Name>
      <StyledActions>
        {productType === 'productsKey' ? (
          <HiOutlineKey />
        ) : (
          <HiOutlineListBullet />
        )}
      </StyledActions>
      <ProductsActions uniqueId={uniqueId} productType={productType} />
    </Table.Row>
  );
}

export default ProductRow;
