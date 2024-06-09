import { useFetchData } from '../../hooks/useFetchData';
import { getRates } from '../../services/apiRates';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

import commafy from '../../utils/commafy';
import Spinner from '../../ui/Spinner';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useState } from 'react';
import EditRate from './EditRate';

function ManageRates() {
  const { isLoading, data, error, refetch, fetchStatus } = useFetchData(
    'getRates',
    getRates
  );

  console.log(data);

  const [idNotDisabled, setIdNotDisabled] = useState(null);

  function handleRate(id) {
    setIdNotDisabled(id);
  }

  if (isLoading) return <Spinner />;

  return (
    <div className='flex flex-col p-12 bg-white mt-4'>
      <div className='flex flex-col justify-center items-center gap-10'>
        {data.map((rate, i) => {
          return (
            <div
              key={rate.id}
              className='grid grid-cols-3 justify-center items-center w-1/2'
            >
              <span className='text-md font-semibold'>
                {rate.currencyEnglishName}
              </span>
              <span className='text-2xl font-bold'>{commafy(rate.price)}</span>
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
              {/* {idNotDisabled && <EditRate rateId={idNotDisabled} />} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageRates;
