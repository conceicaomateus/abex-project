import { localStorageAdapter } from "@/infra/cache/local-storage-adapter";
import { httpClient } from "@/infra/http/http-client";
import { HttpMethod } from "@/infra/types/http-method";

export class BaseService {
  private static _token: string = localStorageAdapter.get('token') as string;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async request<T>(endpoint: string, method: HttpMethod, body?: any) {
    const res = await httpClient.request<T>({
      url: `http://localhost:3000/${endpoint}`,
      method,
      body,
      headers: {
        Authorization: `Bearer ${this._token}`
      }
    });

    return res;
  }
}