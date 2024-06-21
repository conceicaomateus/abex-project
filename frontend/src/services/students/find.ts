import { Student } from '@/models/student';
import { BaseService } from '../base/base-service';

export class FindStudents extends BaseService {
  static async execute(id: number) {
    const response = await this.request<Student>(`students/${id}`, 'get');

    return response.body;
  }
}
