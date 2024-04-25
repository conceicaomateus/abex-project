import { Injectable } from '@nestjs/common';
import { CreateAccessProfileDto } from './dto/create-access-profile.dto';
import { UpdateAccessProfileDto } from './dto/update-access-profile.dto';

@Injectable()
export class AccessProfileService {
  create(createAccessProfileDto: CreateAccessProfileDto) {
    return 'This action adds a new accessProfile';
  }

  findAll() {
    return `This action returns all accessProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessProfile`;
  }

  update(id: number, updateAccessProfileDto: UpdateAccessProfileDto) {
    return `This action updates a #${id} accessProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessProfile`;
  }
}
