import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createCategory } from '../../services/apiCategories';

export function useCreateCategory() {
  const clientQuery = useQueryClient();
  const { isLoading: isCreatingCategory, mutate: mutateCreateCategory } =
    useMutation({
      mutationFn: createCategory,
      onSuccess: () => {
        clientQuery.invalidateQueries(['categories']);
        toast.success('Brand created successfully');
      },
      onError: () => {
        toast.error('Could not create brand!');
      },
    });

  return { isCreatingCategory, mutateCreateCategory };
}
