import { useFetchData } from '../../hooks/useFetchData';
import { getBrands } from '../../services/apiBrands';
import FormRow from '../../ui/FormRow';
import { Option, Select } from '../../ui/Selection';
import SpinnerMini from '../../ui/SpinnerMini';

function SelectBrandForm({ register }) {
  const { isLoading, data, error, refetch } = useFetchData('brands', getBrands);

  if (isLoading) return <SpinnerMini />;

  return (
    <Select
      defaultValue={'DEFAULT'}
      {...register('brand', {
        required: 'This feild is required',
        valueAsNumber: true,
      })}
    >
      <Option value='DEFAULT' disabled>
        Select Platform
      </Option>
      {data.map((rootCat) => (
        <Option key={rootCat.id} value={rootCat.id}>
          {rootCat.englishName}
        </Option>
      ))}
    </Select>
  );
}

export default SelectBrandForm;
