import { Module } from '@nestjs/common';
import { ProjectManagerService } from './project-manager.service';
import { ProjectManagerController } from './project-manager.controller';

@Module({
  controllers: [ProjectManagerController],
  providers: [ProjectManagerService],
})
export class ProjectManagerModule {}
