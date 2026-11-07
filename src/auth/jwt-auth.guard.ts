import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { COOKIE_NAME } from './auth.constants.js';
import { IS_PUBLIC_KEY } from './public.decorator.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const token = this.extractToken(req);
    if (!token) throw new UnauthorizedException('กรุณาเข้าสู่ระบบ');

    try {
      req.user = await this.jwt.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('เซสชันหมดอายุหรือไม่ถูกต้อง');
    }
    return true;
  }

  private extractToken(req: any): string | undefined {
    const fromCookie = req.cookies?.[COOKIE_NAME];
    if (fromCookie) return fromCookie;
    const [type, value] = (req.headers?.authorization ?? '').split(' ');
    return type === 'Bearer' ? value : undefined;
  }
}
