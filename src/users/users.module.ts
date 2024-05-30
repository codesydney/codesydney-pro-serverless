import { Module } from '@nestjs/common'
import { UserService } from './services/user/user.service'
import { UserController } from './controllers/user/user.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UsersModule {}
