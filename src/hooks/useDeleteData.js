import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useDeleteData(name, query, mutationFunction, id) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: () => {
      console.log(id);
      mutationFunction(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${query}`]);
      toast.success(`${name} deleted succesfully`);
    },
    onError: () => {
      toast.error(`${name} could not delete!`);
    },
  });

  return { isLoading, mutate };
}
