import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/roles/roles.enum';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly _prisma: PrismaService, private readonly _userService: UserService) {}

  async create(createStudentDto: CreateStudentDto) {
    const user = await this._userService.create({
      email: createStudentDto.email,
      firstName: createStudentDto.name,
      lastName: createStudentDto.name,
      password: createStudentDto.password,
      role: Role.Student,
    });

    return await this._prisma.student.create({
      data: {
        userId: user.id,
      },
      select: {
        id: true,
      },
    });
  };

  async findAll() {
    await this._prisma.student.findMany();
  }

  async findOne(id: number) {
    await this._prisma.student.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this._prisma.student.findUnique({
      where: { id: id },
    });

    if (!student) 
      throw new Error('Project not found');

    return this._userService.update(student.userId, {
      email: updateStudentDto.email,
      firstName: updateStudentDto.name,
      lastName: updateStudentDto.name,
      password: updateStudentDto.password,
    });
  }

  async remove(id: number) {
    await this._userService.update(id, {
        active: false,
    });
  }
}
