import styled from 'styled-components';
import Table from '../../ui/Table';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import { Select, Option } from '../../ui/Selection';
import { useFormContext } from 'react-hook-form';

function ProductOptionalAddField({
  index,
  loop: selectionLoop,
  setSelectionRenderTime,
}) {
  const { register, unregister } = useFormContext();
  const [renderTime, setRenderTime] = useState(null);
  const loop = Array.from({ length: renderTime });

  function handleRemoveSection() {
    unregister(`selections[${index - 1}]`);
    setSelectionRenderTime((render) => render - 1);
  }
  function handleRemoveOption(indexOption) {
    console.log(indexOption);
    unregister(`selections[${index - 1}].options.option${indexOption}`);
    setRenderTime((render) => render - 1);
  }

  return (
    <Wrapper>
      <Table.Row>
        <Input
          {...register(`selections[${index - 1}].label`)}
          placeholder='Selection name'
        />
        <Select {...register(`selections[${index - 1}].isRequired`)}>
          <Option>True</Option>
          <Option>False</Option>
        </Select>
        <Input
          {...register(`selections[${index - 1}].extra`, {
            valueAsNumber: true,
          })}
          placeholder='%'
        />
        <Input
          {...register(`selections[${index - 1}].coupon`, {
            valueAsNumber: true,
          })}
          placeholder='%'
        />
        <div>
          {loop.map((_, i) => (
            <StyledInputs key={i}>
              <Input
                placeholder='Option name'
                {...register(
                  `selections[${index - 1}].options.option${i + 1}.name`
                )}
              />
              <OptionPriceContainer>
                <Input
                  placeholder='Base (+ or -) $'
                  {...register(
                    `selections[${index - 1}].options.option${i + 1}.priceChange`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                />

                <Input
                  placeholder='Discount %'
                  {...register(
                    `selections[${index - 1}].options.option${i + 1}.discount`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                />
              </OptionPriceContainer>
              {loop.length === i + 1 && (
                <Button
                  type='button'
                  size='small'
                  variation='danger'
                  onClick={() => handleRemoveOption(i + 1)}
                >
                  -
                </Button>
              )}
            </StyledInputs>
          ))}

          <StyledInputs>
            <Button
              type='button'
              size='small'
              onClick={() => setRenderTime((render) => render + 1)}
            >
              +
            </Button>
          </StyledInputs>
        </div>
        <StyledSvg onClick={handleRemoveSection}>
          {selectionLoop.length === index && <HiOutlineTrash />}
        </StyledSvg>
      </Table.Row>
    </Wrapper>
  );
}

export default ProductOptionalAddField;

const Wrapper = styled.div`
  margin-bottom: 2rem;
`;

const StyledInputs = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  margin-bottom: 0.4rem;
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

const OptionsContainer = styled.div`
  margin-bottom: 2rem;
`;

const OptionPriceContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
