import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { UsersModule } from '../../../users/users.module'
import { PrismaModule } from '../../../prisma/prisma.module'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, PrismaModule],
      providers: [UserService],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
