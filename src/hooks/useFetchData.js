import { useQuery } from '@tanstack/react-query';

export function useFetchData(queryKey, queryFunction, id = null) {
  const { isLoading, data, error, refetch, fetchStatus, isPending } = useQuery({
    queryKey: [`${queryKey}`, id],
    queryFn: () => queryFunction(id),
  });

  return { isLoading, data, error, refetch, fetchStatus, isPending };
}
