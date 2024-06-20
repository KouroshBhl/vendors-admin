import { useFetchData } from '../../hooks/useFetchData';
import { getCategories } from '../../services/apiCategories';
import SpinnerMini from '../../ui/SpinnerMini';
import { Option, Select } from '../../ui/Selection';
import { useFormContext } from 'react-hook-form';

function SelectCategoryForm({ register }) {
  const { editProduct } = useFormContext();
  const { data: categories, isLoading } = useFetchData(
    'category',
    getCategories
  );

  if (isLoading) return <SpinnerMini />;

  return (
    <>
      <Select
        defaultValue={'DEFAULT'}
        {...register('category_id', {
          required: 'This feild is required',
          valueAsNumber: true,
        })}
      >
        <Option value='DEFAULT' disabled>
          Select Root Category
        </Option>

        {categories.map((cat) => (
          <Option key={cat.id} value={cat.id}>
            {cat.english_name}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default SelectCategoryForm;
