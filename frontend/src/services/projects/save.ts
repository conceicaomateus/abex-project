import { Project } from '@/models/project';
import { BaseService } from '../base/base-service';

export class SaveProject extends BaseService {
  static async execute(project: Partial<Project>) {
    const isUpdate = Number(project.id ?? 0) !== 0;
    const method = isUpdate ? 'patch' : 'post';
    const endpoint = isUpdate ? `project/${project.id}` : 'project';

    const response = await this.request<{ id: number }>(endpoint, method, project);

    return response.body;
  }
}
