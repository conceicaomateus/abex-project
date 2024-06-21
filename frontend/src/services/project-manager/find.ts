import { ProjectManager } from '@/models/project-manager';
import { BaseService } from '../base/base-service';

export class FindProjectManager extends BaseService {
  static async execute(id: number) {
    const response = await this.request<ProjectManager>(`project-manager/${id}`, 'get');

    return response.body;
  }
}
