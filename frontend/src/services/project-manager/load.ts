import { ProjectManager } from '@/models/project-manager';
import { BaseService } from '../base/base-service';

export class LoadProjectManagers extends BaseService {
  static async execute() {
    const response = await this.request<ProjectManager[]>('project-manager', 'get');

    return response.body;
  }
}
