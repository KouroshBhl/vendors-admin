import { styled } from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { useFetchData } from '../../hooks/useFetchData';
import { getProductType } from '../../services/apiProducts';
import SpinnerMini from '../../ui/SpinnerMini';
import { Option, Select } from '../../ui/Selection';

function SelectProductType({ setProductType }) {
  const { register } = useFormContext();
  const { data, isLoading } = useFetchData('product_type', getProductType);
  function handleChange(e) {
    setProductType(e.target.value);
  }

  if (isLoading) return <SpinnerMini />;
  console.log(data);

  return (
    <Select
      defaultValue={'DEFAULT'}
      {...register('product_type', {
        required: 'This feild is required',
        valueAsNumber: true,
      })}
    >
      <Option value='DEFAULT' disabled>
        Select product type*
      </Option>
      {data.map((type) => (
        <Option key={type.id} value={type.id}>
          {type.english_name}
        </Option>
      ))}
    </Select>
  );
}

export default SelectProductType;
