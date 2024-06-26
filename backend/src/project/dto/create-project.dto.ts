export class CreateProjectDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  vacancies: number;
  schedule: string;
}
