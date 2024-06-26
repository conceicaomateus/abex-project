import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Roles(Role.User, Role.Admin)
  async create(@Req() req: Request, @Body() createProjectDto: CreateProjectDto) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwtDecode<{ id: number }>(token);

    return await this.projectService.create(createProjectDto, user.id);
  }

  @Get()
  @Roles(Role.User, Role.Admin, Role.Student)
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get('registered-students/:id')
  @Roles(Role.User, Role.Admin)
  async findRegisteredStudents(@Param('id') id: string) {
    return await this.projectService.findRegisteredStudents(+id);
  }

  @Patch(':id')
  @Roles(Role.User, Role.Admin)
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @Roles(Role.User, Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.projectService.remove(+id);
  }

  @Get('register-student/:id')
  @Roles(Role.Student)
  async registerStudent(@Req() req: Request, @Res() res: Response, @Param('id') id: string) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const user = jwtDecode<{ email: string }>(token);
      await this.projectService.registerStudent(+id, user.email);
      return res.status(HttpStatus.OK).send();
    } catch (error) { 
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}
