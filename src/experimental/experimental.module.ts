import { Module } from '@nestjs/common'
import { ExperimentalService } from './service/experimental.service'
import { ExperimentalController } from './controller/experimental.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [ExperimentalService],
  controllers: [ExperimentalController],
  exports: [ExperimentalService],
})
export class ExperimentalModule {}
