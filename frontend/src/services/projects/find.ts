import { Project } from '@/models/project';
import { BaseService } from '../base/base-service';

export class FindProject extends BaseService {
  static async execute(id: number) {
    const response = await this.request<Project>(`project/${id}`, 'get');

    return response.body;
  }
}
