import { BaseService } from '../base/base-service';

export class DeleteProject extends BaseService {
  static async execute(id: number) {
    await this.request(`project/${id}`, 'delete');
  }
}
