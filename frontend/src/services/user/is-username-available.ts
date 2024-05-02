import { httpClient } from '@/infra/http/http-client';

export const isUsernameAvailable = async (username: string) => {
  const response = await httpClient.request({
    method: 'get',
    url: `http://localhost:3000/user/username/${username}`,
    body: username,
  });

  return response.body;
};
