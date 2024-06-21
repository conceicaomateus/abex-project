import { BaseService } from '../base/base-service';

export class DeleteStudents extends BaseService {
  static async execute(id: number) {
    await this.request(`students/${id}`, 'delete');
  }
}
