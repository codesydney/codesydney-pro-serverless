import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, UserDto } from 'src/types/user.dto'
import { Public } from 'src/decorators/public.decorators'
import { RefreshTokenGuard } from './refresh-token/refresh-token.guard'
import { Request } from 'express'

//TODO: Some serious refactoring is needed once we go through security analysis

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Because the routers are guarded/protected globally
  // We must annotate @public() any public endpoint
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() userDto: UserDto) {
    return this.authService.register(userDto)
  }

  @UseGuards(RefreshTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    const id = req.user['userId']
    return this.authService.logout(id)
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const id = req.user['userId']
    const refreshToken = req.user['refreshToken']

    return this.authService.refreshTokens(id, refreshToken)
  }
}
