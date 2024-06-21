import { Project } from '@/models/project';
import { BaseService } from '../base/base-service';

export class SaveProject extends BaseService {
  static async execute(project: Partial<Project>) {
    const response = await this.request<{ id: number }>('project', 'post', project);

    return response.body;
  }
}
