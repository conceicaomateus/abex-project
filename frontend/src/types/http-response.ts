import { HttpStatusCode } from './http-status-code';

export type HttpResponse<T = unknown> = {
  statusCode: HttpStatusCode;
  body: T;
};
