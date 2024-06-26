import { BaseService } from '../base/base-service';

export class DeleteStudent extends BaseService {
  static async execute(id: number) {
    await this.request(`student/${id}`, 'delete');
  }
}
