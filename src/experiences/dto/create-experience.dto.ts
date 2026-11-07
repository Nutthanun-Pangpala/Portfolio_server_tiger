import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  /** เช่น "Collaboration", "Education", "Internship" */
  @IsOptional()
  @IsString()
  employmentType?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  /** ISO date เช่น "2025-06-01" */
  @IsDateString()
  startDate: string;

  /** ไม่ส่ง/ส่ง null = ยังทำอยู่ */
  @IsOptional()
  @IsDateString()
  endDate?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
