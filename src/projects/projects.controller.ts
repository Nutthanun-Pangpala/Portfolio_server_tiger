
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('featured')
  findFeatured() {
    return this.projectsService.findFeatured();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const project = await this.projectsService.findOne(slug);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }
}
