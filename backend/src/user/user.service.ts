import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this._prisma.users.create({
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

  async findAll() {
    return await this._prisma.users.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
