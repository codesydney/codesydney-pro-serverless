import { Experimental, Tags } from './experimental.interface'
import { PrismaGenericRepository } from './prima-generic-repository'

// Mocking the PrismaClient model methods
const mockPrismaClient = {
  experimental: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}

describe('PrismaRepositoryImpl', () => {
  let repository: PrismaGenericRepository<Experimental>

  beforeEach(() => {
    repository = new PrismaGenericRepository<Experimental>(
      mockPrismaClient as any,
      mockPrismaClient.experimental,
    )
  })

  afterEach(() => {
    // Clear mocks after each test to avoid interference between tests
    jest.clearAllMocks()
  })

  it('should find all items', async () => {
    const expectedResult = [
      { id: '1', tag: 'EXP', completed: false, label: 'test' },
    ]
    mockPrismaClient.experimental.findMany.mockResolvedValue(expectedResult)

    const result = await repository.findAll()

    expect(result).toEqual(expectedResult)
    expect(mockPrismaClient.experimental.findMany).toHaveBeenCalledTimes(1)
  })

  it('should find item by id', async () => {
    const id = '1'
    const expectedResult = {
      id: '1',
      tag: 'EXP',
      completed: false,
      label: 'test',
    }
    mockPrismaClient.experimental.findUnique.mockResolvedValue(expectedResult)

    const result = await repository.findById(id)

    expect(result).toEqual(expectedResult)
    expect(mockPrismaClient.experimental.findUnique).toHaveBeenCalledWith({
      where: { id },
    })
  })

  it('should find items by unique tag', async () => {
    const tag: Tags = 'EXP'
    const expectedResult = [{ id: '1', tag, completed: false, label: 'test' }]
    mockPrismaClient.experimental.findMany.mockResolvedValue(expectedResult)

    const result = await repository.findByUniqueTag(tag)

    expect(result).toEqual(expectedResult)
    expect(mockPrismaClient.experimental.findMany).toHaveBeenCalledWith({
      where: { tag },
    })
  })

  it('should find items by completed status', async () => {
    const completed = true
    const expectedResult = [{ id: '1', tag: 'EXP', completed, label: 'test' }]
    mockPrismaClient.experimental.findMany.mockResolvedValue(expectedResult)

    const result = await repository.findByCompleted(completed)

    expect(result).toEqual(expectedResult)
    expect(mockPrismaClient.experimental.findMany).toHaveBeenCalledWith({
      where: { completed },
    })
  })

  it('should create an item', async () => {
    const item = { tag: Tags.Exp, completed: false, label: 'test' }
    const expectedResult = { id: '1', ...item }
    mockPrismaClient.experimental.create.mockResolvedValue(expectedResult)

    const result = await repository.create(item)

    expect(result).toEqual(expectedResult)
    expect(mockPrismaClient.experimental.create).toHaveBeenCalledWith({
      data: item,
    })
  })

  it('should update an item', async () => {
    const id = '1'
    const item = { tag: Tags.Exp, completed: false, label: 'updated' }
    const expectedResult = { id, ...item }
    mockPrismaClient.experimental.update.mockResolvedValue(expectedResult)

    const result = await repository.update(id, item)

    expect(result).toEqual(expectedResult)
    expect(mockPrismaClient.experimental.update).toHaveBeenCalledWith({
      where: { id },
      data: item,
    })
  })

  it('should delete an item', async () => {
    const id = '1'
    const expectedResult = { id }
    mockPrismaClient.experimental.delete.mockResolvedValue(expectedResult)

    const result = await repository.delete(id)

    expect(result).toEqual(expectedResult)
    expect(mockPrismaClient.experimental.delete).toHaveBeenCalledWith({
      where: { id },
    })
  })
})
