import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCategory } from '../../services/apiCategories';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['category']);
      toast.success(`Category deleted succesfully`);
    },
    onError: () => {
      toast.error(`Category could not delete!`);
    },
  });

  return { isLoading, mutate };
}
