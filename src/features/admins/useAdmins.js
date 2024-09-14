import { useQuery } from '@tanstack/react-query';
import { getAllAdmins } from '../../services/apiAuth';

export function getAdmins() {
  const { isPending, data: admins } = useQuery({
    queryKey: ['admins'],
    queryFn: () => getAllAdmins(),
  });

  return { isPending, admins };
}
