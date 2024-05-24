import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteSubCategory } from '../../services/apiCategories';

export function useDeleteSubCategory() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['subCategories1']);
      toast.success(`Category deleted succesfully`);
    },
    onError: () => {
      toast.error(`Category could not delete!`);
    },
  });

  return { isLoading, mutate };
}
