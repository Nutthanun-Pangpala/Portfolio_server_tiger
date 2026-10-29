import { Module } from '@nestjs/common';
import { ExperiencesController } from './experiences.controller.js';
import { ExperiencesService } from './experiences.service.js';

@Module({
  controllers: [ExperiencesController],
  providers: [ExperiencesService]
})
export class ExperiencesModule {}
