import { Test, TestingModule } from '@nestjs/testing'
import { ExperimentalService } from './experimental.service'

import { Experimental, Tags } from '../repository/experimental.interface'
import * as uuid from 'uuidv7'
import { PrismaService } from '../../prisma/prisma.service'
import { PrismaRepositoryImpl } from '../repository/prisma-repository-impl'

// Mocking the PrismaService and RepositoryImpl
const mockPrismaService = {
  experimental: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}

const mockRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByUniqueTag: jest.fn(),
  findByCompleted: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

describe('ExperimentalService', () => {
  let service: ExperimentalService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperimentalService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: PrismaRepositoryImpl,
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<ExperimentalService>(ExperimentalService)
  })

  afterEach(() => {
    // Clear mocks after each test to avoid interference between tests
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    // Clear mocks after each test to avoid interference between tests
    expect(service).toBeDefined()
  })

  it('should find all experiments', async () => {
    const tag: Tags = 'EXP'
    const expectedResult = [
      { id: '1', tag: tag, completed: false, label: 'test' },
    ]
    jest
      .spyOn(service['ExpRepository'], 'findAll')
      .mockResolvedValue(expectedResult)

    const result = await service.findAllExp()

    expect(result).toEqual(expectedResult)
    expect(service['ExpRepository'].findAll).toHaveBeenCalledTimes(1)
  })

  it('should find experiment by id', async () => {
    const id = '1'
    const tag: Tags = 'EXP'
    const expectedResult = {
      id: '1',
      tag: tag,
      completed: false,
      label: 'test',
    }
    jest
      .spyOn(service['ExpRepository'], 'findById')
      .mockResolvedValue(expectedResult)

    const result = await service.findById(id)

    expect(result).toEqual(expectedResult)
    expect(service['ExpRepository'].findById).toHaveBeenCalledWith(id)
  })

  it('should find experiments by unique tag', async () => {
    const tag: Tags = 'EXP'
    const expectedResult = [{ id: '1', tag, completed: false, label: 'test' }]
    jest
      .spyOn(service['ExpRepository'], 'findByUniqueTag')
      .mockResolvedValue(expectedResult)

    const result = await service.findByUniqueTag(tag)

    expect(result).toEqual(expectedResult)
    expect(service['ExpRepository'].findByUniqueTag).toHaveBeenCalledWith(tag)
  })

  it('should find experiments by completed status', async () => {
    const completed = true
    const tag: Tags = 'EXP'
    const expectedResult = [{ id: '1', tag: tag, completed, label: 'test' }]
    jest
      .spyOn(service['ExpRepository'], 'findByCompleted')
      .mockResolvedValue(expectedResult)

    const result = await service.findByCompleted(completed)

    expect(result).toEqual(expectedResult)
    expect(service['ExpRepository'].findByCompleted).toHaveBeenCalledWith(
      completed,
    )
  })

  it('should create an experiment', async () => {
    const item: Experimental = {
      id: '',
      tag: 'EXP',
      completed: false,
      label: 'test',
    }
    const expectedResult = { ...item, id: 'new-id' }
    jest.spyOn(uuid, 'uuidv7').mockReturnValueOnce('new-id')
    jest
      .spyOn(service['ExpRepository'], 'create')
      .mockResolvedValue(expectedResult)

    const result = await service.create(item)

    expect(result).toEqual(expectedResult)
    expect(service['ExpRepository'].create).toHaveBeenCalledWith({
      ...item,
      id: 'new-id',
    })
  })

  it('should update an experiment', async () => {
    const id = '1'
    const tag: Tags = 'EXP'
    const item: Experimental = {
      id: '1',
      tag: 'PROTO',
      completed: false,
      label: 'test',
    }
    const expectedResult = { id, tag, ...item }
    jest
      .spyOn(service['ExpRepository'], 'update')
      .mockResolvedValue(expectedResult)

    const result = await service.update(id, item)

    expect(result).toEqual(expectedResult)
    expect(service['ExpRepository'].update).toHaveBeenCalledWith(id, item)
  })

  it('should delete an experiment', async () => {
    const id = '1'
    const tag: Tags = 'EXP'
    const expectedResult = {
      id: '1',
      tag: tag,
      completed: false,
      label: 'test',
    }
    jest
      .spyOn(service['ExpRepository'], 'delete')
      .mockResolvedValue(expectedResult)

    const result = await service.delete(id)

    expect(result).toEqual(expectedResult)
    expect(service['ExpRepository'].delete).toHaveBeenCalledWith(id)
  })
})
