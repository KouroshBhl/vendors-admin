import Table from '../../ui/Table';
import SubSubCategoriesActions from './SubSubCategoriesActions';

function SubSubCategoryRow({ data }) {
  const { englishName, persianName, id } = data;

  return (
    <Table.Row>
      <div>{englishName}</div>
      <div>{persianName}</div>
      <SubSubCategoriesActions categoryID={id} data={data} />
    </Table.Row>
  );
}

export default SubSubCategoryRow;
