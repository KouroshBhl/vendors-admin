import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createSubSubCategory } from '../../services/apiCategories';

export function useCreateSubSubCategory() {
  const clientQuery = useQueryClient();
  const {
    isLoading: isCreatingSubSubCategory,
    mutate: mutateCreateSubSubCategory,
  } = useMutation({
    mutationFn: createSubSubCategory,
    onSuccess: () => {
      clientQuery.invalidateQueries(['subCategories2']);
      toast.success('sub-category created successfully');
    },
    onError: () => {
      toast.error('Could not create sub-category!');
    },
  });

  return { isCreatingSubSubCategory, mutateCreateSubSubCategory };
}
