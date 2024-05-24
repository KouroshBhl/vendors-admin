import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditBrand } from '../../services/apiBrands';
import { toast } from 'react-hot-toast';

export function useEditBrand() {
  const clientQuery = useQueryClient();
  const { isLoading: idEditingBrand, mutate: mutateEditBrand } = useMutation({
    mutationFn: ({ newBrandData, id }) => createEditBrand(newBrandData, id),
    onSuccess: () => {
      clientQuery.invalidateQueries(['brands']);
      toast.success('Brand edited successfully');
    },
    onError: () => {
      toast.error('Could not edit brand!');
    },
  });

  return { idEditingBrand, mutateEditBrand };
}
