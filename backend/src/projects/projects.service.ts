import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this._prisma.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        endDate: createProjectDto.endDate,
        schedule: createProjectDto.schedule,
        vacancies: createProjectDto.vacancies,
        userId: createProjectDto.userId,
      },
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this._prisma.project.findMany();
  }

  async findOne(id: number) {
    return await this._prisma.project.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this._prisma.project.findUnique({
      where: { id: id },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    return await this._prisma.project.update({
      where: { id: id },
      data: {
        name: updateProjectDto.name ?? project.name,
        description: updateProjectDto.description ?? project.description,
        endDate: updateProjectDto.endDate ?? project.endDate,
        schedule: updateProjectDto.schedule ?? project.schedule,
        vacancies: updateProjectDto.vacancies ?? project.vacancies,
      },
    });
  }

  async remove(id: number) {
    await this._prisma.project.update({
      where: { id: id },
      data: { active: false },
    });

    return `This action removes a #${id} project`;
  }
}
