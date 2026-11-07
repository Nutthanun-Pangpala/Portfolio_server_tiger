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
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { ProjectsService } from './projects.service.js';

/** สำหรับหน้า portfolio สาธารณะ (ไม่ต้อง login) */
@Public()
@Controller('projects')
export class PublicProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  findAll() {
    return this.projects.findPublic();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.projects.findPublicBySlug(slug);
  }
}

/** สำหรับหน้า admin (ถูกล็อกโดย JwtAuthGuard ระดับ global) */
@Controller('admin/projects')
export class AdminProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  findAll() {
    return this.projects.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projects.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projects.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projects.update(id, dto);
  }

  @Patch(':id/publish')
  setPublished(@Param('id') id: string, @Body() dto: PublishDto) {
    return this.projects.setPublished(id, dto.isPublished);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projects.remove(id);
  }
}
