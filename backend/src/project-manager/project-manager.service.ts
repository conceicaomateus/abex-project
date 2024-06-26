import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/roles/roles.enum';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateProjectManagerDto } from './dto/create-project-manager.dto';
import { UpdateProjectManagerDto } from './dto/update-project-manager.dto';

@Injectable()
export class ProjectManagerService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _userService: UserService,
  ) {}

  async create(createProjectManagerDto: CreateProjectManagerDto) {
    const user = await this._userService.create({
      email: createProjectManagerDto.email,
      firstName: createProjectManagerDto.firstName,
      lastName: createProjectManagerDto.lastName,
      password: createProjectManagerDto.password,
      role: Role.User,
    });

    return await this._prisma.projectManager.create({
      data: {
        userId: user.id,
        phone: createProjectManagerDto.phone,
      },
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this._prisma.projectManager.findMany({
      where: {
        user: {
          active: true,
        },
      },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            active: true,
          },
        },
      },
    });
  }

  async update(id: number, updateProjectManagerDto: UpdateProjectManagerDto) {
    const projectManager = await this._prisma.projectManager.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      }
    });

    if (!projectManager) throw new Error('Gerente de projeto não encontrado');
    
    await this._prisma.projectManager.update({
      where: { id: id },
      data: {
        phone: updateProjectManagerDto.phone ?? projectManager.phone,        
      },
    });

    await this._userService.update(projectManager.userId, {
      email: updateProjectManagerDto.email ?? projectManager.user.email,
      firstName: updateProjectManagerDto.firstName ?? projectManager.user.firstName,
      lastName: updateProjectManagerDto.lastName ?? projectManager.user.lastName,
    });

    return { id: id }
  }

  async remove(id: number) {
    return await this._prisma.projectManager.update({
      where: { id: id },
      data: {
        user: {
          update: {
            active: false,
          },
        },
      },
    });
  }
}
