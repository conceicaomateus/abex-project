import { Project } from '@/models/project';
import { BaseService } from '../base/base-service';

export class LoadProjects extends BaseService {
  static async execute() {
    const response = await this.request<Project[]>('project', 'get');

    return response.body;
  }
}
