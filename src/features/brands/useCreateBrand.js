import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createEditBrand } from '../../services/apiBrands';

export function useCreateBrand() {
  const clientQuery = useQueryClient();
  const { isLoading: isCreatingBrand, mutate: mutateCreateBrand } = useMutation(
    {
      mutationFn: createEditBrand,
      onSuccess: () => {
        clientQuery.invalidateQueries(['brands']);
        toast.success('Brand created successfully');
      },
      onError: () => {
        toast.error('Could not create brand!');
      },
    }
  );

  return { isCreatingBrand, mutateCreateBrand };
}
