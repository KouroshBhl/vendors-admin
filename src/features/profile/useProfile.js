import { useMutation } from '@tanstack/react-query';
import { updateCurrentUser, updateUserPassword } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useProfile() {
  const { isPending, mutate: updateUser } = useMutation({
    mutationFn: ({ ...data }) => updateCurrentUser(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, updateUser };
}

export function usePassword() {
  const { isPending, mutate: updatePassword } = useMutation({
    mutationFn: ({ ...data }) => updateUserPassword(data),
    onSuccess: () => {
      toast.success('Password has been updated successfully');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, updatePassword };
}
