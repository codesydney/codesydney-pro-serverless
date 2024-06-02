import { Module } from '@nestjs/common'
import { HealthController } from './health/health.controller'
import { CoreModule } from './core/core.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from './auth/access-token/access-token.guard'
import { ExperimentalModule } from './experimental/experimental.module'

// Adding/import individual modules as dependency of the main/global App module
@Module({
  imports: [CoreModule, UsersModule, AuthModule, ExperimentalModule],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
