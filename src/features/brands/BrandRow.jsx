import { Img, Name, Slug } from '../../ui/TableRowUi';
import Table from '../../ui/Table';
import BrandsActions from './BrandsActions';

function BrandRow({ brand }) {
  const { englishName, persianName, slugName, brandLogo, id, description } =
    brand;

  return (
    <Table.Row>
      <Img src={brandLogo} alt={englishName} />
      <Name>{englishName}</Name>
      <Name>{persianName}</Name>
      <Slug>{slugName}</Slug>
      <div>{description}</div>
      <BrandsActions brandID={id} data={{ ...brand }} />
    </Table.Row>
  );
}

export default BrandRow;
