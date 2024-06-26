import { BaseService } from '../base/base-service';

export class RegisterStudent extends BaseService {
  static async execute(projectId: number) {
    await this.request(`project/register-student/${projectId}`, 'get');
  }
}
