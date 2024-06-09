import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editCategory } from '../../services/apiCategories';

export function useEditCategory() {
  const clientQuery = useQueryClient();
  const { isLoading: isEditingCategory, mutate: mutateEditCategory } =
    useMutation({
      mutationFn: ({ newData, id }) => editCategory(newData, id),
      onSuccess: () => {
        clientQuery.invalidateQueries(['categories']);
        toast.success('Category updated successfully');
      },
      onError: () => {
        toast.error('Could not update category!');
      },
    });

  return { isEditingCategory, mutateEditCategory };
}
