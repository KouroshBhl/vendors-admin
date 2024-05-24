import { useFetchData } from '../../hooks/useFetchData';
import { getRootCategories } from '../../services/apiCategories';
import Table from '../../ui/Table';
import CategoryRow from './CategoryRow';

function CategoriesTable() {
  const { data: rootCategories } = useFetchData(
    'categories',
    getRootCategories
  );
  return (
    <Table columns='1fr 1fr 1fr 1fr'>
      <Table.Header>
        <div>Eng name</div>
        <div>IR name</div>
        <div>Sub Categories Actions</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={rootCategories}
        render={(category) => (
          <CategoryRow key={category.id} categories={category} />
        )}
      />
    </Table>
  );
}

export default CategoriesTable;
