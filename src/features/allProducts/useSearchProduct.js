import { useMutation, useQueryClient } from '@tanstack/react-query';
import { searchProduct } from '../../services/apiFunctionality';

export function useSearchProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: mutateSearchQuery,
    isLoading,
    data: searchResults,
  } = useMutation({
    mutationFn: searchProduct,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {},
  });

  return { isLoading, mutateSearchQuery, searchResults };
}
