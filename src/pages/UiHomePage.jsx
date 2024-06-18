import HomePageFeatures from '../features/uiSettings/HomePageFeatures';
import HomePageFeauturesUi from '../features/uiSettings/HomePageFeauturesUi';
import { useFetchData } from '../hooks/useFetchData';
import { getHomePageFeatures } from '../services/apiUI';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Modal from '../ui/Modal';

function UiHomePage() {
  const { isLoading, data } = useFetchData('homepageUI', getHomePageFeatures);

  return (
    <div className='flex flex-col gap-24'>
      <div>
        <Heading as='h2'>Feauture section in Home Page</Heading>
        <HomePageFeauturesUi data={data} isLoading={isLoading} />

        {isLoading || data.length === 3 ? (
          <p className='bg-orange-600 text-white px-4 py-2 rounded inline '>
            You already have 3 features, delete one to make another!
          </p>
        ) : (
          <Modal>
            <Modal.Open opens='create-feauture'>
              <Button size='medium'>Create feuture</Button>
            </Modal.Open>

            <Modal.Window name='create-feauture'>
              <HomePageFeatures />
            </Modal.Window>
          </Modal>
        )}
      </div>

      <div>
        <Heading as='h2'>Most sales products (H)</Heading>
      </div>

      <div>
        <Heading as='h2'>Categories Show #1 (V)</Heading>
      </div>

      <div>
        <Heading as='h2'>New and upcoming releases</Heading>
      </div>

      <div>
        <Heading as='h2'>Categories Show #2 (H)</Heading>
      </div>
    </div>
  );
}

export default UiHomePage;
