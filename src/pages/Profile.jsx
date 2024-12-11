import { useUser } from '../hooks/useUser';
import EditInfo from '../features/profile/EditInfo';
import Heading from '../ui/Heading';

function Profile() {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <Heading as='h1'>Profile Setting</Heading>
      <EditInfo />
    </div>
  );
}

export default Profile;
