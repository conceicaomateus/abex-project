import { ProjectManager } from '@/models/project-manager';
import { BaseService } from '../base/base-service';

export class SaveProjectManager extends BaseService {
  static async execute(projectManager: Partial<ProjectManager>) {
    const isUpdate = Number(projectManager.id ?? 0) !== 0;

    const method = isUpdate ? 'patch' : 'post';
    const endpoint = isUpdate ? `project-manager/${projectManager.id}` : 'project-manager';

    const response = await this.request<{ id: number, registration: string }>(endpoint, method, projectManager);

    return response.body;
  }
}
