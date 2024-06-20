import Table from '../../ui/Table';
import { Name } from '../../ui/TableRowUi';
import CategoriesActions from './CategoriesActions';

function CategoryRow({ categories }) {
  const { english_name, persian_name, id } = categories;

  return (
    <Table.Row>
      <Name>{english_name}</Name>
      <Name>{persian_name}</Name>
      <CategoriesActions data={{ ...categories }} categoryID={id} />
    </Table.Row>
  );
}

export default CategoryRow;
