import { useFieldArray, useFormContext } from 'react-hook-form';
import Button from '../../ui/Button';
import styled from 'styled-components';
import Input from '../../ui/Input';

function ProductOptionalOptions({ selectIndex }) {
  const { register } = useFormContext();

  const {
    fields: optionFields,
    append: optionAppend,
    remove: optionRemove,
  } = useFieldArray({
    name: `selections.${selectIndex}.options`,
    rules: { minLength: 1 },
  });

  return (
    <>
      <div>
        {optionFields.map((item, optionIndex) => (
          <StyledContainer key={item.id}>
            <StyledInputs>
              <Input
                placeholder='Option name'
                dir='rtl'
                {...register(
                  `selections.${selectIndex}.options.${optionIndex}.name`
                )}
              />
              <OptionPriceContainer></OptionPriceContainer>
            </StyledInputs>
            <StyledAddOption>
              <Button type='button' onClick={() => optionRemove(optionIndex)}>
                -
              </Button>
            </StyledAddOption>
          </StyledContainer>
        ))}
        <StyledAddOption>
          <Button type='button' onClick={() => optionAppend()}>
            +
          </Button>
        </StyledAddOption>
      </div>
    </>
  );
}

export default ProductOptionalOptions;

const StyledInputs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
`;

const OptionPriceContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledAddOption = styled.div`
  margin: 1rem 0;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
