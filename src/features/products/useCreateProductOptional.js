import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createProductOptional } from '../../services/apiProducts';

export function useCreateProductOptional() {
  const clientQuery = useQueryClient();
  const { status: optinalStatus, mutate: mutateCreateProductOptional } =
    useMutation({
      mutationFn: createProductOptional,
      onSuccess: () => {
        clientQuery.invalidateQueries(['productsOptional']);
        toast.success('Product created successfully');
      },
      onError: () => {
        toast.error('Could not create product!');
      },
    });

  return { optinalStatus, mutateCreateProductOptional };
}
