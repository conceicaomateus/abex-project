import { HttpRequest } from './http-request';
import { HttpResponse } from './http-response';

export interface HttpClient {
  request: <T>(data: HttpRequest) => Promise<HttpResponse<T>>;
}
