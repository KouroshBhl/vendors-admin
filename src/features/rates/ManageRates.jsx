import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Input,
} from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

import { useFetchData } from '../../hooks/useFetchData';
import { getRates } from '../../services/apiRates';

import commafy from '../../utils/commafy';
import Spinner from '../../ui/Spinner';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../utils/formatDate';
import { useEditRates } from './useEditRates';
import { useProfile } from '../login/useUser';

function ManageRates() {
  const { register, handleSubmit, formState: error } = useForm();
  const { isLoading, data } = useFetchData('getRates', getRates);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedRate, setSelectedRate] = useState({});
  const { isEditingProduct, mutateEditRate } = useEditRates();
  const { id: userId } = useProfile();

  function onSubmit(data) {
    const id = selectedRate.id;
    const currency = Number(data.currency);
    mutateEditRate(
      { newPrirce: currency, id, updatedBy: userId },
      { onSuccess: onOpenChange }
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Table aria-label='Manage currencies' isStriped>
        <TableHeader>
          <TableColumn>Currency</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Last Updated</TableColumn>
          <TableColumn>Updated By</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((rate, i) => {
            return (
              <TableRow key={rate.id}>
                <TableCell className='text-md font-semibold'>
                  <Chip size='lg'>
                    <span className='font-semibold'>
                      {rate.currency_english_name}
                    </span>
                  </Chip>
                </TableCell>

                <TableCell className='text-lg'>
                  <Chip size='lg'>{commafy(rate.price)}</Chip>
                </TableCell>
                <TableCell>
                  <span className='text-medium'>
                    {rate.last_updated
                      ? formatDate(rate.last_updated)
                      : '-------'}
                  </span>
                </TableCell>
                <TableCell>{rate.updated_by.first_name}</TableCell>
                <TableCell>
                  <div className='flex gap-2'>
                    <Icon
                      icon='iconamoon:edit-light'
                      onClick={() => {
                        setSelectedRate(rate);
                        onOpen();
                      }}
                      className='size-6 hover:cursor-pointer'
                    />
                    <Icon
                      icon='material-symbols:delete-outline'
                      className='size-6 text-danger hover:cursor-pointer'
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          setSelectedRate({});
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className='flex flex-col gap-1'>
                {selectedRate.currency_english_name}
              </ModalHeader>
              <ModalBody>
                <Input
                  label={commafy(selectedRate.price)}
                  size='lg'
                  {...register('currency', { required: true })}
                  type='number'
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button
                  color='primary'
                  type='submit'
                  isLoading={isEditingProduct}
                >
                  Update {selectedRate.currency_english_name}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ManageRates;
