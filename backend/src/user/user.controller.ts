import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this._userService.create(createUserDto);
  }

  @Roles('admin')
  @Get()
  async findAll() {
    return await this._userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this._userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this._userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this._userService.remove(id);
  }

  @Get('username/:username')
  async isUsernameAvailable(@Param('username') username: string) {
    return await this._userService.isUsernameAvailable(username);
  }
}
