import { Student } from '@/models/student';
import { BaseService } from '../base/base-service';

export class LoadStudent extends BaseService {
  static async execute() {
    const response = await this.request<Student[]>('student', 'get');

    return response.body;
  }
}
