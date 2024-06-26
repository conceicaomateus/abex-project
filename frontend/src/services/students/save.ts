import { Student } from '@/models/student';
import { BaseService } from '../base/base-service';

export class SaveStudent extends BaseService {
  static async execute(student: Partial<Student>) {
    const isUpdate = Number(student.id ?? 0) !== 0;

    const method = isUpdate ? 'patch' : 'post';
    const endpoint = isUpdate ? `student/${student.id}` : 'student';

    const response = await this.request<{ id: number, registration: string }>(endpoint, method, student);

    return response.body;
  }
}
