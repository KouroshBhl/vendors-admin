import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createFeature } from '../../services/apiUI';

export function useCreateHomePageFeature() {
  const clientQuery = useQueryClient();
  const { mutate: mutateHomePageFeature, status } = useMutation({
    mutationFn: createFeature,

    onSuccess: () => {
      clientQuery.invalidateQueries(['homepageUI']);
      toast.success('Feature created successfully');
    },
    onError: () => {
      toast.error('Could not create feauture!');
    },
  });

  return { mutateHomePageFeature, status };
}
