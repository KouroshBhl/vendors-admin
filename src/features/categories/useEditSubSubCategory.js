import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editSubSubCategory } from '../../services/apiCategories';

export function useEditSubSubCategory() {
  const clientQuery = useQueryClient();
  const { isLoading: isEditingCategory, mutate: mutateEditCategory } =
    useMutation({
      mutationFn: ({ newData, id }) => editSubSubCategory(newData, id),
      onSuccess: () => {
        clientQuery.invalidateQueries(['subCategories2']);
        toast.success('Category updated successfully');
      },
      onError: () => {
        toast.error('Could not update category!');
      },
    });

  return { isEditingCategory, mutateEditCategory };
}
