import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editProduct } from '../../services/apiProducts';

export function useEditProduct() {
  const clientQuery = useQueryClient();
  const { status: isEditingProduct, mutate: mutateEditProduct } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      clientQuery.invalidateQueries(['products']);
      toast.success('Product edited successfully');
    },
    onError: (err) => {
      console.log(err);
      toast.error('Could not edit product!');
    },
  });

  return { isEditingProduct, mutateEditProduct };
}
