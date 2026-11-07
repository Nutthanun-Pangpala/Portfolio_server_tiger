import { Module } from '@nestjs/common';
import {
  AdminProjectsController,
  PublicProjectsController,
} from './projects.controller.js';
import { ProjectsService } from './projects.service.js';

@Module({
  controllers: [PublicProjectsController, AdminProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
