import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { StudentService } from 'src/student/student.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _studentService: StudentService,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: number) {
    console.log(userId);

    return await this._prisma.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        startDate: createProjectDto.startDate ?? new Date(),
        endDate: createProjectDto.endDate ?? new Date(),
        schedule: createProjectDto.schedule,
        vacancies: +createProjectDto.vacancies ?? 1,
        userId: +userId,
      },
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this._prisma.project.findMany({
      where: {
        active: true,
      },
      include: {
        students: {
          select: {
            id: true,
          },
        },
      },
    });
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

    if (!project) throw new Error('Projeto não encontrado');

    return await this._prisma.project.update({
      where: { id: id },
      data: {
        name: updateProjectDto.name ?? project.name,
        description: updateProjectDto.description ?? project.description,
        endDate: updateProjectDto.endDate ?? project.endDate,
        schedule: updateProjectDto.schedule ?? project.schedule,
        vacancies: +updateProjectDto.vacancies ?? project.vacancies,
        startDate: updateProjectDto.startDate ?? project.startDate,
      },
    });
  }

  async remove(id: number) {
    return await this._prisma.project.update({
      where: { id: id },
      data: { active: false },
    });
  }

  async findRegisteredStudents(id: number) {
    const project = await this._prisma.project.findUnique({
      where: { id: id },
      include: {
        students: {
          select: {
            registration: true,
            course: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return project.students;
  }

  async registerStudent(projectId: number, userEmail: string) {
    const student = await this._studentService.findByEmail(userEmail);

    const project = await this._prisma.project.findUnique({
      where: { id: projectId },
      include: {
        students: {
          where: {
            id: student.id,
          },
        },
      },
    });

    if (project.students.length) throw new Error('Estudante já registrado neste projeto');

    await this._studentService.update(student.id, { projectId: projectId });
  }
}
