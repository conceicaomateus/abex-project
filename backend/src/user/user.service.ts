import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (!(await this.isUsernameAvailable(createUserDto.username))) throw new Error('Username is not available');

    if (!(await this.isEmailAvailable(createUserDto.email))) throw new Error('Email is not available');

    return await this._prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        username: createUserDto.username,
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

  async findByUsername(username: string) {
    return await this._prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const isUsernameAvailable = await this.isUsernameAvailable(updateUserDto.username);

    if (isUsernameAvailable) throw new Error('Username is not available');

    await this._prisma.user.update({
      where: { id: id },
      data: {
        email: updateUserDto.email ?? user.email,
        name: updateUserDto.name ?? user.name,
        password: updateUserDto.password ?? user.password,
        username: updateUserDto.username ?? user.username,
      },
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this._prisma.user.update({
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
