import { useFetchData } from '../../hooks/useFetchData';
import { getCategories } from '../../services/apiCategories';
import SpinnerMini from '../../ui/SpinnerMini';
import { useState } from 'react';
import { Option, Select } from '../../ui/Selection';
import { useFormContext } from 'react-hook-form';

function SelectCategoryForm({ register }) {
  const { editProduct } = useFormContext();
  const [rootId, setRootId] = useState(editProduct.rootCategory || null);
  const { data: categories, isLoading } = useFetchData(
    'category',
    getCategories
  );
  console.log(categories);

  if (isLoading) return <SpinnerMini />;

  return (
    <>
      <Select
        defaultValue={'DEFAULT'}
        {...register('rootCategory', {
          required: 'This feild is required',
          onChange: (e) => setRootId(e.target.value),
          valueAsNumber: true,
        })}
      >
        <Option value='DEFAULT' disabled>
          Select Root Category
        </Option>

        {categories.map((rootCat) => (
          <Option key={rootCat.id} value={rootCat.id}>
            {rootCat.englishName}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default SelectCategoryForm;
