import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editRates } from '../../services/apiRates';

export function useEditRates() {
  const clientQuery = useQueryClient();
  const { isPending: isEditingProduct, mutate: mutateEditRate } = useMutation({
    mutationFn: ({ newPrirce, id, updatedBy }) =>
      editRates({ newPrirce, id, updatedBy }),
    onSuccess: () => {
      clientQuery.invalidateQueries(['product_currency']);
      toast.success('Currency edited successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditingProduct, mutateEditRate };
}
