import { Module } from '@nestjs/common'
import { HealthController } from './health/health.controller'
import { CoreModule } from './core/core.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

// Adding/import individual modules as dependency of the main/global App module
@Module({
  imports: [CoreModule, UsersModule, AuthModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
