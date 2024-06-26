import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { CreateProjectManagerDto } from './dto/create-project-manager.dto';
import { UpdateProjectManagerDto } from './dto/update-project-manager.dto';
import { ProjectManagerService } from './project-manager.service';

@Controller('project-manager')
export class ProjectManagerController {
  constructor(private readonly projectManagerService: ProjectManagerService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Res() res: Response, @Body() createProjectManagerDto: CreateProjectManagerDto) {
    try {
      const entity = await this.projectManagerService.create(createProjectManagerDto);

      return res.status(HttpStatus.CREATED).json({ id: entity.id });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  @Roles(Role.Admin)
  async findAll() {
    return await this.projectManagerService.findAll();
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateProjectManagerDto: UpdateProjectManagerDto) {
    try {
      console.log("Update");

      const entity = await this.projectManagerService.update(+id, updateProjectManagerDto);

      return res.status(HttpStatus.OK).json({ id: entity.id });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.projectManagerService.remove(+id);
  }
}
