import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import HomePageFeatureDelete from './HomePageFeatureDelete';

function HomePageFeauturesUi({ data, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <div className='py-12'>
      <ul className='grid grid-cols-3 gap-12'>
        {data.map((feature) => (
          <Container key={feature.id}>
            <h3>{feature.name}</h3>
            <a
              href={feature.link}
              target='_blank'
              className='bg-blue-500 text-white px-2 py-1 rounded text-md'
            >
              Go to page
            </a>
            <HomePageFeatureDelete id={feature.id} />
          </Container>
        ))}
      </ul>
    </div>
  );
}

export default HomePageFeauturesUi;

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-brand-50);
  border-radius: 7px;
  padding: 20px;
  width: auto;
  img {
    width: 20%;
    height: auto;
  }
`;
