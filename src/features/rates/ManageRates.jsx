import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from '@nextui-org/react';

import { useFetchData } from '../../hooks/useFetchData';
import { getRates } from '../../services/apiRates';

import commafy from '../../utils/commafy';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { useState } from 'react';
import EditRate from './EditRate';

function ManageRates() {
  const { isLoading, data } = useFetchData('getRates', getRates);

  const [idNotDisabled, setIdNotDisabled] = useState(null);

  function handleRate(id) {
    setIdNotDisabled(id);
  }

  if (isLoading) return <Spinner />;

  return (
    <Table>
      <TableHeader className='text-md'>
        <TableColumn>Currency</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Currency</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((rate, i) => {
          return (
            <TableRow key={rate.id}>
              <TableCell className='text-md font-semibold'>
                {rate.currency_english_name}
              </TableCell>
              <TableCell className='text-2xl font-bold'>
                {commafy(rate.price)}
              </TableCell>
              <TableCell>
                {idNotDisabled !== rate.id ? (
                  <Button onClick={() => handleRate(rate.id)} className=''>
                    Update rate
                  </Button>
                ) : (
                  <EditRate
                    rateId={idNotDisabled}
                    setIdNotDisabled={setIdNotDisabled}
                  />
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default ManageRates;
