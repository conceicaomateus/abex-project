import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (!(await this.isUsernameAvailable(createUserDto.username))) {
      throw new Error('Username is not available');
    }

    if (!(await this.isEmailAvailable(createUserDto.email))) {
      throw new Error('Email is not available');
    }

    return this._prisma.user.create({
      data: {
        id: randomUUID(),
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        username: createUserDto.username,
        updated_at: new Date(),
      },
      select: {
        id: true,
      },
    });
  }

  findAll() {
    return this._prisma.user.findMany();
  }

  findOne(id: string) {
    return this._prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const isUsernameAvailable = this.isUsernameAvailable(updateUserDto.username);

    if (isUsernameAvailable) {
      throw new Error('Username is not available');
    }

    this._prisma.user.update({
      where: { id: id },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        password: updateUserDto.password,
        username: updateUserDto.username,
      },
    });
  }

  remove(id: string) {
    const user = this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    this._prisma.user.update({
      data: {
        active: false,
      },
      where: { id: id },
    });
  }

  async isUsernameAvailable(username: string) {
    const hasUser = await this._prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    return !hasUser;
  }

  async isEmailAvailable(email: string) {
    const hasUser = await this._prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return !hasUser;
  }
}
