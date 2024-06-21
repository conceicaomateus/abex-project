import { Student } from '@/models/student';
import { BaseService } from '../base/base-service';

export class SaveStudent extends BaseService {
  static async execute(student: Partial<Student>) {
    const response = await this.request<{ id: number }>('student', 'post', student);

    return response.body;
  }
}
