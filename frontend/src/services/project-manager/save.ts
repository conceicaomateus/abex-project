import { ProjectManager } from '@/models/project-manager';
import { BaseService } from '../base/base-service';

export class SaveProjectManager extends BaseService {
  static async execute(projectManager: Partial<ProjectManager>) {
    const response = await this.request<{ id: number }>('project-manager', 'post', projectManager);

    return response.body;
  }
}
