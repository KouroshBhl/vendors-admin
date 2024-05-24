import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createSubCategory } from '../../services/apiCategories';

export function useCreateSubCategory() {
  const clientQuery = useQueryClient();
  const { isLoading: isCreatingSubCategory, mutate: mutateCreateSubCategory } =
    useMutation({
      mutationFn: createSubCategory,
      onSuccess: () => {
        clientQuery.invalidateQueries(['subCategories1']);
        toast.success('sub-category created successfully');
      },
      onError: () => {
        toast.error('Could not create sub-category!');
      },
    });

  return { isCreatingSubCategory, mutateCreateSubCategory };
}
