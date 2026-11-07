
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import type { Request, Response } from 'express';
import { COOKIE_MAX_AGE_MS, COOKIE_NAME } from './auth.constants.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { Public } from './public.decorator.js';

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ('none' as const) : ('lax' as const),
  maxAge: COOKIE_MAX_AGE_MS,
  path: '/',
};

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.auth.login(dto);

    res.cookie(COOKIE_NAME, token, cookieOptions);

    return user;
  }

  @Public()
  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: isProduction,
      sameSite: cookieOptions.sameSite,
      path: '/',
    });

    return { ok: true };
  }

  @Get('me')
  me(@Req() req: Request & {
    user: { sub: string; email: string };
  }) {
    return {
      id: req.user.sub,
      email: req.user.email,
    };
  }
}
