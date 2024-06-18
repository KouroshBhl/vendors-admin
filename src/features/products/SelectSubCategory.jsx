import { useFetchData } from '../../hooks/useFetchData';
import { getSubCategories } from '../../services/apiCategories';
import SpinnerMini from '../../ui/SpinnerMini';
import { useEffect, useRef, useState } from 'react';
import { Select, Option } from '../../ui/Selection';
import SelectChildCategory from './SelectChildCategory';
import { useFormContext } from 'react-hook-form';

function SelectSubCategory({ rootId, register }) {
  const { editProduct, isEditSession } = useFormContext();
  const subCategoryField = useRef();
  const childCategoryField = useRef();
  const [subId, setSubId] = useState(editProduct.subCategory || null);
  const {
    data: subCategories,
    isLoading: isLoadingSub,
    refetch,
  } = useFetchData('subCategories1', getSubCategories, rootId);

  useEffect(
    function () {
      refetch();
      if (!subCategoryField.current) return;
      subCategoryField.current.clearValue();
      childCategoryField.current.clearValue();
    },
    [rootId]
  );

  if (isLoadingSub) return <SpinnerMini />;

  return (
    <>
      <Select
        defaultValue={'DEFAULT'}
        {...register('subCategory', {
          onChange: (e) => setSubId(e.target.value),
          valueAsNumber: true,
        })}
      >
        <Option value='DEFAULT' disabled>
          Select Sub-Category
        </Option>
        {subCategories.map((subCat) => (
          <Option key={subCat.id} value={subCat.id}>
            {subCat.englishName}
          </Option>
        ))}
      </Select>

      {(subId || isEditSession) && (
        <SelectChildCategory
          register={register}
          subId={Number(subId)}
          rootId={rootId}
          childCategoryField={childCategoryField}
        />
      )}
    </>
  );
}

export default SelectSubCategory;
