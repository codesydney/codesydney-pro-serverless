import { PrismaClient } from '@prisma/client'
import { UserRepository } from './repository'

describe('Repository', () => {
  let userRepository: UserRepository

  beforeEach(() => {
    const prismaClientMock = new PrismaClient() // Create a mock instance of PrismaClient
    userRepository = new UserRepository(prismaClientMock)
  })

  it('should be defined', () => {
    expect(userRepository).toBeDefined()
  })
})
