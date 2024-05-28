import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, UserDto } from 'src/types/user.dto'
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/decorators/public.decorators'
import { RefreshTokenGuard } from './refresh-token/refresh-token.guard'
import { Tokens } from 'src/types/jwt'

//TODO: Some serious refactoring is needed once we go through security analysis

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Because the routers are guarded/protected globally
  // We must annotate @public() any public endpoint
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<Tokens> {
    return this.authService.login(loginDto.email, loginDto.password)
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() userDto: UserDto): Promise<Tokens> {
    return this.authService.register(userDto)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId)
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
