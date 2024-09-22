import { useMutation } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useProfile() {
  const { isPending, mutate: updateUser } = useMutation({
    mutationFn: ({ ...data }) => updateCurrentUser(data),
    onSuccess: () => {
      toast.success('Profile updated');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, updateUser };
}
