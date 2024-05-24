import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createProductKey } from '../../services/apiProducts';

export function useEditProductKey() {
  const clientQuery = useQueryClient();
  const { status: isEditingProductKey, mutate: mutateEditProdutKey } =
    useMutation({
      mutationFn: ({ data, id }) => createProductKey(data, id),
      onSuccess: () => {
        clientQuery.invalidateQueries(['productsKey']);
        toast.success('Product edited successfully');
      },
      onError: () => {
        toast.error('Could not edit product!');
      },
    });

  return { isEditingProductKey, mutateEditProdutKey };
}
