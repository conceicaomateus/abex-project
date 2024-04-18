import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessProfileService } from './access-profile.service';
import { CreateAccessProfileDto } from './dto/create-access-profile.dto';
import { UpdateAccessProfileDto } from './dto/update-access-profile.dto';

@Controller('access-profile')
export class AccessProfileController {
  constructor(private readonly accessProfileService: AccessProfileService) {}

  @Post()
  create(@Body() createAccessProfileDto: CreateAccessProfileDto) {
    return this.accessProfileService.create(createAccessProfileDto);
  }

  @Get()
  findAll() {
    return this.accessProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessProfileDto: UpdateAccessProfileDto) {
    return this.accessProfileService.update(+id, updateAccessProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessProfileService.remove(+id);
  }
}
