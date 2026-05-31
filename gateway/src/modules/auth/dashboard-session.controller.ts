import { Controller, Delete, InternalServerErrorException, Post, Res, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/auth.decorators';

const DASHBOARD_COOKIE_NAME = 'wagateway_dashboard_key';

@ApiTags('Dashboard Auth')
@Controller('auth/dashboard-session')
export class DashboardSessionController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a same-origin dashboard session when dashboard auto-login is enabled' })
  async createDashboardSession(@Res({ passthrough: true }) response: Response) {
    const enabled = ['true', '1', 'yes'].includes(String(process.env.DASHBOARD_AUTO_LOGIN || '').toLowerCase());

    if (!enabled) {
      throw new UnauthorizedException('Dashboard auto-login is disabled');
    }

    const apiKey = this.authService.getPersistedDefaultApiKey();

    if (!apiKey) {
      throw new InternalServerErrorException('No persisted dashboard API key is available yet');
    }

    const validatedKey = await this.authService.validateApiKey(apiKey);

    response.cookie(DASHBOARD_COOKIE_NAME, apiKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      authenticated: true,
      role: validatedKey.role,
    };
  }

  @Delete()
  @Public()
  @ApiOperation({ summary: 'Clear the same-origin dashboard session cookie' })
  clearDashboardSession(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(DASHBOARD_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { authenticated: false };
  }
}
