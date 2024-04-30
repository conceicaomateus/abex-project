import { HttpClient } from '@/types/http-client';
import { HttpRequest } from '@/types/http-request';
import { HttpResponse } from '@/types/http-response';
import axios from 'axios';

class AxiosHttpClient implements HttpClient {
  private static instance: HttpClient;

  async request<R>(data: HttpRequest): Promise<HttpResponse<R>> {
    const response = await axios.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: data.headers,
    });

    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  public static getInstance(): HttpClient {
    if (!this.instance) {
      this.instance = new AxiosHttpClient();
    }

    return this.instance;
  }
}

const httpClient = AxiosHttpClient.getInstance();

export { httpClient };
