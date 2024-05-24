import { Link, useParams } from 'react-router-dom';
import Table from '../../ui/Table';
import SubSubCategoriesRow from './SubSubCategoryRow';
import AddSubSubCategories from './AddSubSubCategories';
import { getSubSubCategories } from '../../services/apiCategories';
import Spinner from '../../ui/Spinner';
import ErrorFallback from '../../ui/ErrorFallback';
import { useFetchData } from '../../hooks/useFetchData';

function SubSubCategories() {
  const { subSubCategoryId: getSubParam } = useParams();
  const fullParam = getSubParam?.split('-');
  const {
    isLoading,
    data: subSubCategories,
    error,
    refetch,
  } = useFetchData('subCategories2', getSubSubCategories, fullParam.at(1));

  if (!subSubCategories) return;

  if (isLoading) return <Spinner />;

  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;

  return (
    <>
      <Link to={-1}>&larr; Back to Parent categories</Link>
      <h2>{fullParam.at(0).toUpperCase()} Sub-Categories</h2>
      <Table columns='1fr 1fr 1fr'>
        <Table.Row>
          <div>ENG NAME</div>
          <div>IR NAME</div>
          <div>ACTIONS</div>
        </Table.Row>
        <Table.Body
          data={subSubCategories}
          render={(sub) => <SubSubCategoriesRow data={sub} key={sub.id} />}
        ></Table.Body>
      </Table>
      <AddSubSubCategories />
    </>
  );
}

export default SubSubCategories;
