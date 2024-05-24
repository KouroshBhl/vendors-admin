import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteSubSubCategory } from '../../services/apiCategories';

export function useDeleteSubSubCategory() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteSubSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['subCategories2']);
      toast.success(`Category deleted succesfully`);
    },
    onError: () => {
      toast.error(`Category could not delete!`);
    },
  });

  return { isLoading, mutate };
}
