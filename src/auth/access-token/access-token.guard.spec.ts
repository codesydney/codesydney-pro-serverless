import { Reflector } from '@nestjs/core'
import { AccessTokenGuard } from './access-token.guard'

describe('AccessTokenGuard', () => {
  let accessTokenGuard: AccessTokenGuard
  beforeEach(() => {
    const reflectorMock = {} as Reflector // Mock Reflector
    accessTokenGuard = new AccessTokenGuard(reflectorMock)
  })
  it('should be defined', () => {
    expect(accessTokenGuard).toBeDefined()
  })
})
