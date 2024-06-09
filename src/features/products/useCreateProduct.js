import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createProduct } from '../../services/apiProducts';

export function useCreateProduct() {
  const clientQuery = useQueryClient();
  const { status, mutate: mutateCreateProduct } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      clientQuery.invalidateQueries(['products']);
      toast.success('Product created successfully');
    },
    onError: () => {
      toast.error('Could not create product!');
    },
  });

  return { status, mutateCreateProduct };
}
