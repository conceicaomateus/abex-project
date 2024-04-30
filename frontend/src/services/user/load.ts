import { httpClient } from '@/infra/http/http-client';
import { User } from '@/models/user';

export const loadUsers = async () => {
  const response = await httpClient.request<User[]>({
    method: 'get',
    url: 'http://localhost:3000/user',
  });

  return response.body;
};
