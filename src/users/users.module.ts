import { Module } from '@nestjs/common'
import { UserService } from './services/user/user.service'
import { UserController } from './controllers/user/user.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { APP_GUARD } from '@nestjs/core'
import { RefreshTokenGuard } from 'src/auth/refresh-token/refresh-token.guard'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: RefreshTokenGuard, // TODO: Still need to make the proper connections
    },
  ],
})
export class UsersModule {}
