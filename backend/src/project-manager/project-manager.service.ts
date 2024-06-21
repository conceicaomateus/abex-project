import { Injectable } from '@nestjs/common';
import { CreateProjectManagerDto } from './dto/create-project-manager.dto';
import { UpdateProjectManagerDto } from './dto/update-project-manager.dto';

@Injectable()
export class ProjectManagerService {
  create(createProjectManagerDto: CreateProjectManagerDto) {
    return 'This action adds a new projectManager';
  }

  findAll() {
    return `This action returns all projectManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectManager`;
  }

  update(id: number, updateProjectManagerDto: UpdateProjectManagerDto) {
    return `This action updates a #${id} projectManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectManager`;
  }
}
