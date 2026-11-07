import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from '../auth/public.decorator.js';
import { PublishDto } from '../common/dto/publish.dto.js';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';
import { ExperiencesService } from './experiences.service.js';

@Public()
@Controller('experiences')
export class PublicExperiencesController {
  constructor(private readonly experiences: ExperiencesService) {}

  @Get()
  findAll() {
    return this.experiences.findPublic();
  }
}

@Controller('admin/experiences')
export class AdminExperiencesController {
  constructor(private readonly experiences: ExperiencesService) {}

  @Get()
  findAll() {
    return this.experiences.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experiences.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateExperienceDto) {
    return this.experiences.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.experiences.update(id, dto);
  }

  @Patch(':id/publish')
  setPublished(@Param('id') id: string, @Body() dto: PublishDto) {
    return this.experiences.setPublished(id, dto.isPublished);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experiences.remove(id);
  }
}
