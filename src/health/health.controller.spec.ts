import { Test, TestingModule } from '@nestjs/testing'
import { HealthController } from './health.controller'

describe('AppController', () => {
  let healthController: HealthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [],
    }).compile()

    healthController = app.get<HealthController>(HealthController)
  })

  describe('root', () => {
    it('should return "OK"', () => {
      expect(healthController.index()).toBe('OK')
    })
  })
})
