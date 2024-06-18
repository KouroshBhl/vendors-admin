import { useFetchData } from '../../hooks/useFetchData';
import { getCategories } from '../../services/apiCategories';
import Table from '../../ui/Table';
import CategoryRow from './CategoryRow';

function CategoriesTable({ categories }) {
  return (
    <Table columns='1fr 1fr 1fr'>
      <Table.Header>
        <div>English name</div>
        <div>Persian name</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={categories}
        render={(category) => (
          <CategoryRow key={category.id} categories={category} />
        )}
      />
    </Table>
  );
}

export default CategoriesTable;
