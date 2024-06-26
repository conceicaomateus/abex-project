import { BaseService } from '../base/base-service';

type ProjectManagerResponse = {
  id: number;
  phone: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
};

export class LoadProjectManagers extends BaseService {
  static async execute() {
    const response = await this.request<ProjectManagerResponse[]>('project-manager', 'get');

    return response.body;
  }
}
