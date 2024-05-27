import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from 'src/types/user.dto'
import { Public } from 'src/decorators/public.decorators'

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
}
