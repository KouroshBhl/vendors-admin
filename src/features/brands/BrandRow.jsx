import { Img, Name, Slug } from '../../ui/TableRowUi';
import Table from '../../ui/Table';
import BrandsActions from './BrandsActions';

function BrandRow({ brand }) {
  const {
    english_name,
    persian_name,
    slug_name,
    platform_logo,
    id,
    description,
  } = brand;

  return (
    <Table.Row>
      <Img src={platform_logo} alt={english_name} />
      <Name>{english_name}</Name>
      <Name>{persian_name}</Name>
      <Slug>{slug_name}</Slug>
      <div>{description}</div>
      <BrandsActions brandID={id} data={{ ...brand }} />
    </Table.Row>
  );
}

export default BrandRow;
