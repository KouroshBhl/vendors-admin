import { useFieldArray, useFormContext } from 'react-hook-form';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import styled from 'styled-components';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { Option, Select } from '../../ui/Selection';
import ProductOptionalOptions from './ProductOptionalOptions';

function ProductOptional() {
  const { register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: 'selections',
    rules: { minLength: 1 },
  });

  return (
    <>
      <FormRow label='Base Price *'>
        <Input
          placeholder='$'
          {...register('basePrice', { valueAsNumber: true })}
        />
      </FormRow>
      <Table columns='4rem 1fr 8rem 8rem 8rem 1.5fr'>
        <Table.Header>
          <div></div>
          <div>Label</div>
          <div>Required?</div>
          <div>Extra</div>
          <div>Coupon</div>
          <div>Options</div>
        </Table.Header>

        {fields.map((item, selectIndex) => (
          <Table.Row key={item.id}>
            <Button
              variation='danger'
              type='button'
              onClick={() => remove(selectIndex)}
            >
              -
            </Button>
            <Input
              {...register(`selections.${selectIndex}.label`)}
              placeholder='Selection name'
            />

            <Select {...register(`selections.${selectIndex}.isRequired`)}>
              <Option>True</Option>
              <Option>False</Option>
            </Select>

            <Input
              {...register(`selections.${selectIndex}.extra`, {
                valueAsNumber: true,
              })}
              placeholder='%'
            />

            <Input
              {...register(`selections.${selectIndex}.coupon`, {
                valueAsNumber: true,
              })}
              placeholder='%'
            />
            <ProductOptionalOptions selectIndex={selectIndex} />
          </Table.Row>
        ))}

        <AddWrapper>
          <Button type='button' size='small' onClick={() => append()}>
            Add new selection
          </Button>
        </AddWrapper>
      </Table>
      <FormRow label='Info needed from buyer *'>
        <Input
          placeholder='Write in persian and seprate each with Comma ,'
          {...register('infoFromBuyer')}
        />
      </FormRow>
    </>
  );
}

export default ProductOptional;

const AddWrapper = styled.div`
  text-align: center;
  margin: 1.2rem;
`;

const Container = styled.div`
  display: flex;
  gap: 2.4rem;

  > span {
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.6rem;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-weight: 500;
  margin-right: 6rem;
`;

const StyledInputCheck = styled.input``;
