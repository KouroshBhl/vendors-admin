import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createProduct } from '../../services/apiProducts';

export function useEditProduct() {
  const clientQuery = useQueryClient();
  const { status: isEditingProduct, mutate: mutateEditProduct } = useMutation({
    mutationFn: ({ data, id }) => createProduct(data, id),
    onSuccess: () => {
      clientQuery.invalidateQueries(['products']);
      toast.success('Product edited successfully');
    },
    onError: () => {
      toast.error('Could not edit product!');
    },
  });

  return { isEditingProduct, mutateEditProduct };
}
