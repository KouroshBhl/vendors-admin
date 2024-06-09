import { Link } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import SubCategoriesActions from './SubCategoriesActions';

function SubCategoryRow({ data }) {
  const { englishName, persianName, id } = data;
  return (
    <Table.Row>
      <div>{englishName}</div>
      <div>{persianName}</div>
      <Link to={`${englishName}-${id}`}>
        <Button variation='secondary' size='small'>
          Sub-Categories
        </Button>
      </Link>
      <SubCategoriesActions categoryID={id} data={data} />
    </Table.Row>
  );
}

export default SubCategoryRow;
