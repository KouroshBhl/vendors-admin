import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { duplicateProduct } from '../../services/apiProducts';

export function useDuplicateProduct() {
  const clientQuery = useQueryClient();
  const { status: isDuplicating, mutate: mutateDuplicateProduct } = useMutation(
    {
      mutationFn: ({ data, duplicatingId }) =>
        duplicateProduct(data, duplicatingId),
      onSuccess: () => {
        clientQuery.invalidateQueries(['products']);
        toast.success('Product duplicated successfully');
      },
      onError: () => {
        toast.error('Could not duplicate product!');
      },
    }
  );

  return { isDuplicating, mutateDuplicateProduct };
}
