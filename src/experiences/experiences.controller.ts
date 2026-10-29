
import { Controller, Get } from '@nestjs/common';
import { ExperiencesService } from './experiences.service.js';

@Controller('experiences')
export class ExperiencesController {
  constructor(
    private readonly experiencesService: ExperiencesService,
  ) {}

  @Get()
  findAll() {
    return this.experiencesService.findAll();
  }
}
