import { PrismaClient } from '@prisma/client'
import { IExperimentalRepository, Tags } from './experimental.interface'

export class PrismaGenericRepository<T> implements IExperimentalRepository<T> {
  private prisma: PrismaClient
  private model: any

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma
    this.model = model
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany()
  }
  async findById(id: string): Promise<T> {
    return await this.model.findUnique({ where: { id } })
  }
  async findByUniqueTag(tag: Tags): Promise<T[]> {
    return await this.model.findMany({ where: { tag } })
  }
  async findByCompleted(completed: boolean): Promise<T[]> {
    return await this.model.findMany({ where: { completed } })
  }
  async create(item: Partial<T>): Promise<T> {
    return await this.model.create({ data: item })
  }
  async update(id: string, item: Partial<T>): Promise<T> {
    return await this.model.update({ where: { id }, data: item })
  }
  async delete(id: string): Promise<T> {
    return await this.model.delete({ where: { id } })
  }
}
