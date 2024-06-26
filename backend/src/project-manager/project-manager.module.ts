import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/user.service';
import { ProjectManagerController } from './project-manager.controller';
import { ProjectManagerService } from './project-manager.service';

@Module({
  controllers: [ProjectManagerController],
  providers: [ProjectManagerService, PrismaService, UserService],
})
export class ProjectManagerModule {}
