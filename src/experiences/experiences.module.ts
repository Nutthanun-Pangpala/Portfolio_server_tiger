import { Module } from '@nestjs/common';
import {
  AdminExperiencesController,
  PublicExperiencesController,
} from './experiences.controller.js';
import { ExperiencesService } from './experiences.service.js';

@Module({
  controllers: [PublicExperiencesController, AdminExperiencesController],
  providers: [ExperiencesService],
})
export class ExperiencesModule {}
