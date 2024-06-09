import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useCreateBrand(name, queryKey, mutatuinFunction) {
  const clientQuery = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: mutatuinFunction,
    onSuccess: () => {
      clientQuery.invalidateQueries([`${queryKey}`]);
      toast.success(`${name} created successfully`);
    },
    onError: () => {
      toast.error(`Could not create ${name}!`);
    },
  });

  return { isLoading, mutate };
}
