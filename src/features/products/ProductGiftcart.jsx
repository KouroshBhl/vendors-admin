import Button from '../../ui/Button';
import Table from '../../ui/Table';
import { styled } from 'styled-components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Input from '../../ui/Input';

import Textarea from '../../ui/Textarea';
import { HiOutlineTrash } from 'react-icons/hi2';
import ProductRegionCurrency from './ProductRegionCurrency';

function ProductGiftcart() {
  const { isEditSession, editProduct, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: 'selections',
    rules: { minLength: 1 },
  });

  return (
    <Table columns='8rem 8rem 1fr 5rem 5rem 5rem 1fr 1fr 5rem'>
      <Table.Header>
        <div>Region</div>
        <div>Currency</div>
        <div>Values</div>
        <div>Extra</div>
        <div>Coupon</div>
        <div>Off</div>
        <div>Link</div>
        <div>Note</div>
        <div>Delete</div>
      </Table.Header>

      {fields.map((item, i) => (
        <Table.Row key={item.id}>
          <ProductRegionCurrency index={i} />

          <Textarea
            {...register(`selections.${i}.values`)}
            placeholder='Enter values and seprate them with Comma ( , ) e.g: 1,5,10,20,50'
          />

          <Input
            defaultValue={0}
            placeholder='%'
            {...register(`selections.${i}.extra`, {
              valueAsNumber: true,
            })}
          />

          <Input
            defaultValue={0}
            placeholder='%'
            {...register(`selections.${i}.discount`, {
              valueAsNumber: true,
            })}
          />

          <Input
            defaultValue={0}
            placeholder='%'
            {...register(`selections.${i}.coupon`, {
              valueAsNumber: true,
            })}
          />

          <Input
            placeholder='Purchase link recommended'
            {...register(`selections.${i}.purchaseLink`)}
          />

          <Textarea
            placeholder='Note for admins'
            {...register(`selections.${i}.adminNote`)}
          />

          <StyledSvg onClick={() => remove(i)}>
            <HiOutlineTrash />
          </StyledSvg>
        </Table.Row>
      ))}

      <ButtonWrapper>
        <Button size='small' onClick={() => append()} type='button'>
          Add new region
        </Button>
      </ButtonWrapper>
    </Table>
  );
}

export default ProductGiftcart;

const ButtonWrapper = styled.div`
  margin: 1.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
`;
const StyledSvg = styled.div`
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
    cursor: pointer;
  }
`;
