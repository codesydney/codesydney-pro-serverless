import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenStrategy } from './accesstoken.strategy'
import { RefreshTokenStrategy } from './refreshtoken.strategy'
import { PassportModule } from '@nestjs/passport'
import { APP_GUARD } from '@nestjs/core'
import { RefreshTokenGuard } from './refresh-token/refresh-token.guard'

@Module({
  imports: [UsersModule, PassportModule, JwtModule],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: RefreshTokenGuard, // TODO: Still need to make the proper connections
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
