
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';

const DUMMY_HASH =
  '$2b$10$CwTycUXWue0Thq9StjUM0uJ8.2n0cC1Q1uQ5W4m3k2yq0u0fK1b2e';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

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

    if (!admin || !passwordValid) {
      throw new UnauthorizedException(
        'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
      );
    }

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
  }
}
