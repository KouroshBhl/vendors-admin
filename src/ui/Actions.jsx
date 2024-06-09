import styled from 'styled-components';

const StyledActions = styled.div`
  display: flex;
  gap: 1.4rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
    color: var(--color-brand-700);
  }
`;

const Button = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
`;

export { StyledActions, Button };
