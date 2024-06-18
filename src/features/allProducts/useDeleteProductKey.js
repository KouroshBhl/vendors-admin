import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useDeleteProductKey(name, query, mutationFunction, id) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ uniqueId, productType }) => {
      mutationFunction({ uniqueId, productType });
    },
    onSuccess: () => {
      console.log(true);
      queryClient.invalidateQueries(['productsKey']);
      toast.success(`${name} deleted succesfully`);
    },
    onError: () => {
      toast.error(`${name} could not delete!`);
    },
  });

  return { isLoading, mutate };
}
