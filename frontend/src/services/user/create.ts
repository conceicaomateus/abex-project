import { httpClient } from '@/infra/http/http-client';
import { User } from '@/models/user';

export const createUser = async (user: User) => {
  const response = await httpClient.request({
    method: 'post',
    url: 'http://localhost:3000/user',
    body: user,
  });

  return response.body;
};
