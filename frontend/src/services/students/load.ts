import { BaseService } from '../base/base-service';

type StudentResponse = {
  id: number;
  registration: string;
  phone: string;
  cpf: string;
  course: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
  };
};

export class LoadStudent extends BaseService {
  static async execute() {
    const response = await this.request<StudentResponse[]>('student', 'get');

    return response.body;
  }
}
