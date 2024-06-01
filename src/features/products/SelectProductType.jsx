import { styled } from 'styled-components';
import { useFormContext } from 'react-hook-form';

function SelectProductType({ setProductType }) {
  const { register } = useFormContext();
  function handleChange(e) {
    setProductType(e.target.value);
  }
  return (
    <Container>
      <Wrapper>
        <RadionInput
          type='radio'
          id='key'
          name='type'
          value='key'
          onChange={handleChange}
          {...register('productType', {
            onChange: handleChange,
          })}
        />
        <label htmlFor='key'>Key</label>
      </Wrapper>

      <Wrapper>
        <RadionInput
          type='radio'
          id='gift'
          name='type'
          value='gift'
          onChange={handleChange}
          {...register('productType', {
            onChange: handleChange,
          })}
        />
        <label htmlFor='gift'>Gift</label>
      </Wrapper>

      <Wrapper>
        <RadionInput
          type='radio'
          id='account'
          name='type'
          value='account'
          onChange={handleChange}
          {...register('productType', {
            onChange: handleChange,
          })}
        />
        <label htmlFor='account'>Account</label>
      </Wrapper>

      <Wrapper>
        <RadionInput
          type='radio'
          id='trade'
          name='type'
          value='trade'
          onChange={handleChange}
          {...register('productType', {
            onChange: handleChange,
          })}
        />
        <label htmlFor='trade'>Trade</label>
      </Wrapper>
    </Container>
  );
}

export default SelectProductType;

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

const RadionInput = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
