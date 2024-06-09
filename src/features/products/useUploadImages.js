import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { uploadImages } from '../../services/apiProducts';

export function useUploadImages() {
  const clientQuery = useQueryClient();
  const {
    status,
    mutate: mutateUploadImages,
    isSuccess,
  } = useMutation({
    mutationFn: uploadImages,
    onSuccess: () => {
      clientQuery.invalidateQueries(['uploadImages']);
      toast.success('Images uploaded successfully');
    },
    onError: () => {
      toast.error('Could not upload images!');
    },
  });

  return { status, mutateUploadImages, isSuccess };
}
