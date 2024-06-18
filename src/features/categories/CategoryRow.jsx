import Table from '../../ui/Table';
import { Name } from '../../ui/TableRowUi';
import CategoriesActions from './CategoriesActions';

function CategoryRow({ categories }) {
  const { englishName, persianName, id } = categories;

  return (
    <Table.Row>
      <Name>{englishName}</Name>
      <Name>{persianName}</Name>
      <CategoriesActions data={{ ...categories }} categoryID={id} />
    </Table.Row>
  );
}

export default CategoryRow;
