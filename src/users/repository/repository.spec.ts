import { UserRepository } from './repository'

describe('Repository', () => {
  it('should be defined', () => {
    expect(new UserRepository()).toBeDefined()
  })
})
