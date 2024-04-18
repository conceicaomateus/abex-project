export class CreateProjectDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}