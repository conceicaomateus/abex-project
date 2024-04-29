import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const isUsernameAvailable = this.isUsernameAvailable(createUserDto.username);

    if (isUsernameAvailable) {
      throw new Error('Username is not available');
    }

    return this._prisma.users.create({
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
    return this._prisma.users.findMany();
  }

  findOne(id: string) {
    return this._prisma.users.findUnique({
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

    this._prisma.users.update({
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

    this._prisma.users.update({
      data: {
        active: false,
      },
      where: { id: id },
    });
  }

  isUsernameAvailable(username: string) {
    return this._prisma.users.findFirst({
      where: {
        username: username,
      },
    });
  }
}
