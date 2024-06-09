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
  );
}

export default UiHomePage;
