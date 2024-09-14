import AllAdmins from '../features/admins/AllAdmins';
import Heading from '../ui/Heading';

function Admins() {
  return (
    <div>
      <Heading as='h1'>Manage Admins</Heading>
      <AllAdmins />
    </div>
  );
}

export default Admins;
