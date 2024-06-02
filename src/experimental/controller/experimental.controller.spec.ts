import { Test, TestingModule } from '@nestjs/testing'
import { ExperimentalController } from './experimental.controller'
import { ExperimentalService } from '../service/experimental.service'
import { Experimental, Tags } from '../repository/experimental.interface'

// Mocking the Service
const mockExperimentalService = {
  findAllExp: jest.fn(),
  findById: jest.fn(),
  findByUniqueTag: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

describe('ExperimentalController', () => {
  let controller: ExperimentalController
  let service: ExperimentalService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperimentalController],
      providers: [
        {
          provide: ExperimentalService,
          useValue: mockExperimentalService,
        },
      ],
    }).compile()

    controller = module.get<ExperimentalController>(ExperimentalController)
    service = module.get<ExperimentalService>(ExperimentalService)
  })

  afterEach(() => {
    // Clear mocks after each test to avoid interference between tests
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should get all experiments', async () => {
    const tag: Tags = 'EXP'
    const expectedResult = [
      { id: '1', tag: tag, completed: false, label: 'test' },
    ]
    jest.spyOn(service, 'findAllExp').mockResolvedValue(expectedResult)

    const result = await controller.getAllExp()

    expect(result).toEqual(expectedResult)
    expect(service.findAllExp).toHaveBeenCalledTimes(1)
  })

  it('should get experiment by id', async () => {
    const id = '1'
    const tag: Tags = 'EXP'
    const expectedResult = {
      id: '1',
      tag: tag,
      completed: false,
      label: 'test',
    }
    jest.spyOn(service, 'findById').mockResolvedValue(expectedResult)

    const result = await controller.getById(id)

    expect(result).toEqual(expectedResult)
    expect(service.findById).toHaveBeenCalledWith(id)
  })

  it('should get experiments by tag', async () => {
    const tag: Tags = 'EXP'
    const expectedResult = [{ id: '1', tag, completed: false, label: 'test' }]
    jest.spyOn(service, 'findByUniqueTag').mockResolvedValue(expectedResult)

    const result = await controller.getByTag(tag)

    expect(result).toEqual(expectedResult)
    expect(service.findByUniqueTag).toHaveBeenCalledWith(tag)
  })

  it('should create an experiment', async () => {
    const tag: Tags = 'EXP'
    const item: Experimental = {
      id: '',
      tag: tag,
      completed: false,
      label: 'test',
    }
    const expectedResult = { ...item, id: '1' }
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult)

    const result = await controller.createExp(item)

    expect(result).toEqual(expectedResult)
    expect(service.create).toHaveBeenCalledWith(item)
  })

  it('should update an experiment', async () => {
    const id = '1'
    const tag: Tags = 'EXP'
    const item: Experimental = {
      id,
      tag: tag,
      completed: false,
      label: 'updated',
    }
    const expectedResult = item
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult)

    const result = await controller.updateExp(id, item)

    expect(result).toEqual(expectedResult)
    expect(service.update).toHaveBeenCalledWith(id, item)
  })

  it('should delete an experiment', async () => {
    const id = '1'
    const tag: Tags = 'EXP'
    const expectedResult = { id: id, tag: tag, completed: false, label: 'test' }
    jest.spyOn(service, 'delete').mockResolvedValue(expectedResult)

    const result = await controller.deleteExp(id)

    expect(result).toEqual(expectedResult)
    expect(service.delete).toHaveBeenCalledWith(id)
  })
})
