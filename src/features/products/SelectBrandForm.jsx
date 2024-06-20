import { useFetchData } from '../../hooks/useFetchData';
import { getBrands } from '../../services/apiBrands';
import { Option, Select } from '../../ui/Selection';
import SpinnerMini from '../../ui/SpinnerMini';

function SelectBrandForm({ register }) {
  const { isLoading, data } = useFetchData('product_platform', getBrands);

  if (isLoading) return <SpinnerMini />;

  return (
    <Select
      defaultValue={'DEFAULT'}
      {...register('platform_id', {
        required: 'This feild is required',
        valueAsNumber: true,
      })}
    >
      <Option value='DEFAULT' disabled>
        Select Platform
      </Option>
      {data.map((rootCat) => (
        <Option key={rootCat.id} value={rootCat.id}>
          {rootCat.english_name}
        </Option>
      ))}
    </Select>
  );
}

export default SelectBrandForm;
