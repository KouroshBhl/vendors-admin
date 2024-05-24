import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createProductOptional } from '../../services/apiProducts';

export function useEditProductOptional() {
  const clientQuery = useQueryClient();
  const { status: isEditingProductOptional, mutate: mutateEditProdutOptional } =
    useMutation({
      mutationFn: ({ data, id }) => createProductOptional(data, id),
      onSuccess: () => {
        clientQuery.invalidateQueries(['productsOptional']);
        toast.success('Product edited successfully');
      },
      onError: () => {
        toast.error('Could not edit product!');
      },
    });

  return { isEditingProductOptional, mutateEditProdutOptional };
}
