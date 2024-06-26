import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Res() res: Response, @Body() createStudentDto: CreateStudentDto) {
    try {
      const entity = await this.studentService.create(createStudentDto);

      return res.status(HttpStatus.CREATED).json({ id: entity.id, registration: entity.registration });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  @Roles(Role.Admin)
  async findAll() {
    return await this.studentService.findAll();
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    try {
      console.log("Update");

      const entity = await this.studentService.update(+id, updateStudentDto);

      return res.status(HttpStatus.OK).json({ id: entity.id, registration: entity.registration });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.studentService.remove(+id);
  }
}
