import AddCategory from '../features/categories/AddCategory';
import CategoriesTable from '../features/categories/CategoriesTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Spinner from '../ui/Spinner';
import ErrorFallback from '../ui/ErrorFallback';
import { getCategories } from '../services/apiCategories';
import { useFetchData } from '../hooks/useFetchData';

function Categories() {
  const { isLoading, error, refetch, data } = useFetchData(
    'category',
    getCategories
  );

  if (isLoading) return <Spinner />;

  if (error)
    return <ErrorFallback resetErrorBoundary={refetch} error={error} />;

  return (
    <>
      <Row>
        <Heading as='h1'>Categories</Heading>
      </Row>

      <Row>
        <CategoriesTable categories={data} />
        <div>
          <AddCategory />
        </div>
      </Row>
    </>
  );
}

export default Categories;
