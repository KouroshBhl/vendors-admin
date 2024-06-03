import { useQuery } from '@tanstack/react-query';

export function useFetchData(queryKey, queryFunction, id = null) {
  console.log(queryFunction);
  const { isLoading, data, error, refetch, fetchStatus } = useQuery({
    queryKey: [`${queryKey}`],
    queryFn: () => queryFunction(id),
  });

  return { isLoading, data, error, refetch, fetchStatus };
}
