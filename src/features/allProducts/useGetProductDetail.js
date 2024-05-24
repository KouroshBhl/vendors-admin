import { useQuery } from '@tanstack/react-query';

export function useGetProductDetail(queryKey, queryFunction, id = null, type) {
  const {
    isLoading,
    data,
    error,
    refetch,
    fetchStatus,
    isFetching,
    isSuccess,
    isPreviousData,
  } = useQuery({
    queryKey: [`${queryKey}`],
    queryFn: () => queryFunction({ id, type }),
  });

  return {
    isLoading,
    data,
    error,
    refetch,
    fetchStatus,
    isFetching,
    isSuccess,
    isPreviousData,
  };
}
