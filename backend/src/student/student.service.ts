import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/roles/roles.enum';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/user.service';
import { generateRegistration } from 'src/utils/generate-registration';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _userService: UserService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const user = await this._userService.create({
      email: createStudentDto.email,
      firstName: createStudentDto.firstName,
      lastName: createStudentDto.lastName,
      password: createStudentDto.password,
      role: Role.Student,
    });

    return await this._prisma.student.create({
      data: {
        userId: user.id,
        course: createStudentDto.course,
        cpf: createStudentDto.cpf,
        phone: createStudentDto.phone,
        registration: generateRegistration(),
      },
      select: {
        id: true,
        registration: true,
      },
    });
  }

  async findAll() {
    return await this._prisma.student.findMany({
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

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this._prisma.student.findUnique({
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

    if (!student) throw new Error('Estudante não encontrado');

    await this._prisma.student.update({
      where: { id: id },
      data: {
        course: updateStudentDto.course ?? student.course,
        cpf: updateStudentDto.cpf ?? student.cpf,
        phone: updateStudentDto.phone ?? student.phone,
        projectId: updateStudentDto.projectId ?? student.projectId,   
      },
    });

    await this._userService.update(student.userId, {
      email: updateStudentDto.email ?? student.user.email,
      firstName: updateStudentDto.firstName ?? student.user.firstName,
      lastName: updateStudentDto.lastName ?? student.user.lastName,
    });

    return { id: id, registration: student.registration }
  }

  async remove(id: number) {
    return await this._prisma.student.update({
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

  async findByEmail(email: string) {
    return await this._prisma.student.findFirst({
      where: {
        user: {
          email: email,
        },
      },
    });
  }
}
