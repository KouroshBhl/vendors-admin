import { useEffect, useRef } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { getSubSubCategories } from '../../services/apiCategories';
import { Select, Option } from '../../ui/Selection';
import SpinnerMini from '../../ui/SpinnerMini';

function SelectChildCategory({ subId, register, rootId, childCategoryField }) {
  const {
    data: subCategories,
    isLoading: isLoadingSub,
    refetch,
  } = useFetchData('subCategories2', getSubSubCategories, subId);

  useEffect(
    function () {
      refetch();
      if (!childCategoryField.current) return;
      childCategoryField.current.clearValue();
    },
    [subId, rootId]
  );

  if (isLoadingSub) return <SpinnerMini />;

  return (
    <Select
      {...register('childCategory', { valueAsNumber: true })}
      defaultValue={'DEFAULT'}
    >
      <Option value='DEFAULT' disabled>
        Select Sub-Category
      </Option>
      {subCategories.map((rootCat) => (
        <Option key={rootCat.id} value={rootCat.id}>
          {rootCat.englishName}
        </Option>
      ))}
    </Select>
  );
}

export default SelectChildCategory;
