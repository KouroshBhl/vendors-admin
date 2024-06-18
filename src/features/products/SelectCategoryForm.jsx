import { useFetchData } from '../../hooks/useFetchData';
import { getCategories } from '../../services/apiCategories';
import SpinnerMini from '../../ui/SpinnerMini';
import { useState } from 'react';
import { Option, Select } from '../../ui/Selection';
import { useFormContext } from 'react-hook-form';

function SelectCategoryForm({ register }) {
  const { editProduct } = useFormContext();
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
        {...register('categoryId', {
          required: 'This feild is required',
          valueAsNumber: true,
        })}
      >
        <Option value='DEFAULT' disabled>
          Select Root Category
        </Option>

        {categories.map((cat) => (
          <Option key={cat.id} value={cat.id}>
            {cat.englishName}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default SelectCategoryForm;
