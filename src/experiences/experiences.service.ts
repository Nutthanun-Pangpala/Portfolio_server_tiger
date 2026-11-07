import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  findPublic() {
    return this.prisma.experience.findMany({
      where: { isPublished: true },
      orderBy: { startDate: 'desc' },
    });
  }

  findAll() {
    return this.prisma.experience.findMany({ orderBy: { startDate: 'desc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.experience.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('ไม่พบประสบการณ์');
    return item;
  }

  create(dto: CreateExperienceDto) {
    const { startDate, endDate, ...rest } = dto;
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    this.assertRange(start, end);

    return this.prisma.experience.create({
      data: { ...rest, startDate: start, endDate: end },
    });
  }

  async update(id: string, dto: UpdateExperienceDto) {
    const current = await this.findOne(id);
    const { startDate, endDate, ...rest } = dto;

    const start = startDate ? new Date(startDate) : current.startDate;
    const end =
      endDate === undefined
        ? current.endDate
        : endDate === null
          ? null
          : new Date(endDate);
    this.assertRange(start, end);

    return this.prisma.experience.update({
      where: { id },
      data: {
        ...rest,
        ...(startDate !== undefined && { startDate: start }),
        ...(endDate !== undefined && { endDate: end }),
      },
    });
  }

  async setPublished(id: string, isPublished: boolean) {
    await this.findOne(id);
    return this.prisma.experience.update({
      where: { id },
      data: { isPublished },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.experience.delete({ where: { id } });
    return { ok: true };
  }

  private assertRange(start: Date, end: Date | null) {
    if (end && end < start) {
      throw new BadRequestException('วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่ม');
    }
  }
}
