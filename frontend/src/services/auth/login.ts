import { httpClient } from '@/infra/http/http-client';

export const login = async (email: string, password: string) => {
  const response = await httpClient.request<{ access_token: string }>({
    method: 'post',
    url: 'http://localhost:3000/auth/login',
    body: {
      email,
      password,
    },
  });

  return response.body.access_token;
};
