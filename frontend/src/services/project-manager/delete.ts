import { BaseService } from '../base/base-service';

export class DeleteProjectManager extends BaseService {
  static async execute(id: number) {
    await this.request(`project-manager/${id}`, 'delete');
  }
}
