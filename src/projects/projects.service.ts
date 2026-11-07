import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { slugify } from './slug.util.js';

// แนะนำก่อน (isFeatured) แล้วเรียงใหม่สุดก่อน
const ORDER = [{ isFeatured: 'desc' as const }, { createdAt: 'desc' as const }];

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------- public ----------
  findPublic() {
    return this.prisma.project.findMany({
      where: { isPublished: true },
      orderBy: ORDER,
    });
  }

  async findPublicBySlug(slug: string) {
    const project = await this.prisma.project.findFirst({
      where: { slug, isPublished: true },
    });
    if (!project) throw new NotFoundException('ไม่พบผลงาน');
    return project;
  }

  // ---------- admin ----------
  findAll() {
    return this.prisma.project.findMany({ orderBy: ORDER });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('ไม่พบผลงาน');
    return project;
  }

  async create(dto: CreateProjectDto) {
    const slug = dto.slug
      ? await this.ensureSlugFree(dto.slug)
      : await this.generateSlug(dto.title);
    return this.prisma.project.create({ data: { ...dto, slug } });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    if (dto.slug) await this.ensureSlugFree(dto.slug, id);
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  async setPublished(id: string, isPublished: boolean) {
    await this.findOne(id);
    return this.prisma.project.update({ where: { id }, data: { isPublished } });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
    return { ok: true };
  }

  // ---------- helpers ----------
  private async ensureSlugFree(slug: string, excludeId?: string) {
    const exists = await this.prisma.project.findFirst({
      where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
      select: { id: true },
    });
    if (exists) throw new ConflictException(`slug "${slug}" ถูกใช้แล้ว`);
    return slug;
  }

  private async generateSlug(title: string) {
    const root = slugify(title) || `project-${Date.now().toString(36)}`;
    let slug = root;
    let n = 1;
    while (
      await this.prisma.project.findUnique({
        where: { slug },
        select: { id: true },
      })
    ) {
      n += 1;
      slug = `${root}-${n}`;
    }
    return slug;
  }
}
