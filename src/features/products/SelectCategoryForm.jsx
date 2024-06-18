import { useFetchData } from '../../hooks/useFetchData';
import { getRootCategories } from '../../services/apiCategories';
import SpinnerMini from '../../ui/SpinnerMini';
import { useState } from 'react';
import SelectSubCategory from './SelectSubCategory';
import { Option, Select } from '../../ui/Selection';
import { useFormContext } from 'react-hook-form';

function SelectCategoryForm({ register }) {
  const { editProduct } = useFormContext();
  const [rootId, setRootId] = useState(editProduct.rootCategory || null);
  const { data: rootCategories, isLoading } = useFetchData(
    'categories',
    getRootCategories
  );
  console.log(rootCategories);

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

        {rootCategories.map((rootCat) => (
          <Option key={rootCat.id} value={rootCat.id}>
            {rootCat.englishName}
          </Option>
        ))}
      </Select>

      {rootId && (
        <SelectSubCategory rootId={Number(rootId)} register={register} />
      )}
    </>
  );
}

export default SelectCategoryForm;
