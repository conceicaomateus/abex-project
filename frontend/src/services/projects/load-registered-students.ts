import { BaseService } from '../base/base-service';

type RegisteredStudentsResponse = {
  registration: string;
  course: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
};

export class LoadRegisteredStudents extends BaseService {
  static async execute(projectId: number) {
    const response = await this.request<RegisteredStudentsResponse[]>(`project/registered-students/${projectId}`, 'get');

    return response.body;
  }
}
