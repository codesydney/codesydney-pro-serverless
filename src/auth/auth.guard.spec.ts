import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let authGuard: AuthGuard

  beforeEach(() => {
    const jwtServiceMock = {} as JwtService // Mock JwtService
    const reflectorMock = {} as Reflector // Mock Reflector
    authGuard = new AuthGuard(jwtServiceMock, reflectorMock)
  })
  it('should be defined', () => {
    expect(authGuard).toBeDefined()
  })
})
