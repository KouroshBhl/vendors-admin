import styled from 'styled-components';

const Img = styled.img`
  display: block;
  width: 3.2rem;
  height: 3.2rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin-left: 1.2rem;
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
`;

const Name = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Slug = styled.div`
  font-family: 'Sono';
  font-weight: 600;
  font-size: 1.6rem;
`;

export { Img, Name, Slug };
