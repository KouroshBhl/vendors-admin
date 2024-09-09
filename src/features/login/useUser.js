import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, getUserRole } from '../../services/apiAuth';

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { isPending, user, isAuthenticated: user?.role === 'authenticated' };
}
export function useProfile() {
  const { isPending, data: role } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserRole,
  });

  return {
    isPending,
    id: role?.id,
    role: role?.role_id.role,
    firstName: role?.first_name,
    lastName: role?.last_name,
  };
}
