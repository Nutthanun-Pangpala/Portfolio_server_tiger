
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { timingSafeEqual } from 'node:crypto';

import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

const DUMMY_HASH =
  '$2b$10$CwTycUXWue0Thq9StjUM0uJ8.2n0cC1Q1uQ5W4m3k2yq0u0fK1b2e';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  private isValidInviteCode(input: string): boolean {
    const expected = this.config.getOrThrow<string>('ADMIN_INVITE_CODE');

    const inputBuffer = Buffer.from(input, 'utf8');
    const expectedBuffer = Buffer.from(expected, 'utf8');

    if (inputBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(inputBuffer, expectedBuffer);
  }

  async register(dto: RegisterDto) {
    if (!this.isValidInviteCode(dto.inviteCode)) {
      throw new UnauthorizedException('Invite Code ไม่ถูกต้อง');
    }

    if (Buffer.byteLength(dto.password, 'utf8') > 72) {
      throw new BadRequestException('Password ต้องมีขนาดไม่เกิน 72 bytes');
    }

    const email = dto.email.trim().toLowerCase();

    const existingAdmin = await this.prisma.adminUser.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      throw new ConflictException('อีเมลนี้ถูกใช้งานแล้ว');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    try {
      const admin = await this.prisma.adminUser.create({
        data: {
          email,
          passwordHash,
        },
      });

      const token = await this.jwt.signAsync({
        sub: admin.id,
        email: admin.email,
      });

      return {
        token,
        user: {
          id: admin.id,
          email: admin.email,
        },
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('อีเมลนี้ถูกใช้งานแล้ว');
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
  const email = dto.email.trim().toLowerCase();
  const password = dto.password;

  const admin = await this.prisma.adminUser.findUnique({
    where: { email },
  });

  const passwordValid = await bcrypt.compare(
    password,
    admin?.passwordHash ?? DUMMY_HASH,
  );

  // เพิ่มตรงนี้
  console.log('[LOGIN DEBUG]', {
    adminFound: Boolean(admin),
    passwordValid,
    hashExists: Boolean(admin?.passwordHash),
  });

  if (!admin || !passwordValid) {
    throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  }

  const token = await this.jwt.signAsync({
    sub: admin.id,
    email: admin.email,
  });

  return {
    token,
    user: { id: admin.id, email: admin.email },
  };
}
}