import { Injectable, OnModuleInit } from '@nestjs/common';
import { Role } from 'src/auth/roles/roles.enum';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly _prisma: PrismaService) {}

  async onModuleInit() {
    const existsAdmin = await this.findByEmail('admin');

    if (existsAdmin?.id) return;

    this.create({
      email: 'admin',
      firstName: 'admin',
      lastName: 'admin',
      password: 'admin',
      role: Role.Admin,
    });
  }

  async create(createUserDto: CreateUserDto) {
    if (!(await this.isEmailAvailable(createUserDto.email))) throw new Error('O email não está disponível');

    return await this._prisma.user.create({
      data: {
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: createUserDto.password,
        role: createUserDto.role,
      },
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this._prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this._prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!(await this.isEmailAvailable(updateUserDto.email, id))) throw new Error('O email não está disponível');

    await this._prisma.user.update({
      where: { id: id },
      data: {
        email: updateUserDto.email ?? user.email,
        firstName: updateUserDto.firstName ?? user.firstName,
        lastName: updateUserDto.lastName ?? user.lastName,
        password: updateUserDto.password ?? user.password,
        active: updateUserDto.active ?? user.active,
      },
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new Error('User not found');

    await this._prisma.user.update({
      data: {
        active: false,
      },
      where: { id: id },
    });
  }

  async findByEmail(email: string) {
    return await this._prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  
  }

  async isEmailAvailable(email: string, id?: number) {
    console.log(email, id);

    const hasUser = await this._prisma.user.findFirst({
      where: {
        email: email,
        id: {
          not: id,
        },
      },
    });

    console.log(hasUser);

    return !hasUser;
  }
}
