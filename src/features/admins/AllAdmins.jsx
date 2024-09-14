import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from '@nextui-org/react';
import { getAdmins } from './useAdmins';
import AdminTable from './AdminTable';

function AllAdmins() {
  const { isPending, admins } = getAdmins();
  if (isPending) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner size='lg' color='primary' label='Loading...' />
      </div>
    );
  }
  return (
    <div>
      <AdminTable users={admins} />
    </div>
  );
}

export default AllAdmins;
