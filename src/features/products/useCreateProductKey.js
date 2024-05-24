import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createProductKey } from '../../services/apiProducts';

export function useCreateProductKey() {
  const clientQuery = useQueryClient();
  const { status, mutate: mutateCreateProductKey } = useMutation({
    mutationFn: createProductKey,
    onSuccess: () => {
      clientQuery.invalidateQueries(['productsKey']);
      toast.success('Product created successfully');
      // reset();
    },
    onError: () => {
      toast.error('Could not create product!');
    },
  });

  return { status, mutateCreateProductKey };
}
