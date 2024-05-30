import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { AuthModule } from './auth.module'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule, JwtModule],
      providers: [AuthService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
