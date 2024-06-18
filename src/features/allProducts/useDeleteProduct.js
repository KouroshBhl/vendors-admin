import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useDeleteProduct(name, query, mutationFunction, id) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ id }) => {
      mutationFunction({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(`${name} deleted succesfully`);
    },
    onError: () => {
      toast.error(`${name} could not delete!`);
    },
  });

  return { isLoading, mutate };
}
