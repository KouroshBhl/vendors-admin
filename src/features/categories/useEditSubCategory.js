import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editSubCategory } from '../../services/apiCategories';

export function useEditSubCategory() {
  const clientQuery = useQueryClient();
  const { isLoading: isEditingCategory, mutate: mutateEditCategory } =
    useMutation({
      mutationFn: ({ newData, id }) => editSubCategory(newData, id),
      onSuccess: () => {
        clientQuery.invalidateQueries(['subCategories1']);
        toast.success('Category updated successfully');
      },
      onError: () => {
        toast.error('Could not update category!');
      },
    });

  return { isEditingCategory, mutateEditCategory };
}
