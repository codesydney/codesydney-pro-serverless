import { Module } from '@nestjs/common'
import { UserService } from './services/user/user.service'
import { UserController } from './controllers/user/user.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/auth/auth.guard'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UsersModule {}
