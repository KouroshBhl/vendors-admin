import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editRates } from '../../services/apiRates';

export function useEditRates() {
  const clientQuery = useQueryClient();
  const { status: isEditingProduct, mutate: mutateEditRate } = useMutation({
    mutationFn: ({ data, id }) => editRates(data, id),
    onSuccess: () => {
      clientQuery.invalidateQueries(['currencies']);
      toast.success('Currency edited successfully');
    },
    onError: () => {
      toast.error('Could not edit Currency!');
    },
  });

  return { isEditingProduct, mutateEditRate };
}
