import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { PrismaRepositoryImpl } from '../repository/prisma-repository-impl'
import { Experimental } from '../repository/experimental.interface'
import { Tags } from '@prisma/client'
import { uuidv7 } from 'uuidv7'

@Injectable()
export class ExperimentalService {
  constructor(private prisma: PrismaService) {}

  private ExpRepository = new PrismaRepositoryImpl(this.prisma)

  async findAllExp(): Promise<Experimental[]> {
    return await this.ExpRepository.findAll()
  }

  async findById(id: string): Promise<Experimental> {
    return await this.ExpRepository.findById(id)
  }

  async findByUniqueTag(tag: Tags) {
    return await this.ExpRepository.findByUniqueTag(tag)
  }

  async findByCompleted(completed: boolean): Promise<Experimental[]> {
    return this.ExpRepository.findByCompleted(completed)
  }

  async create(item: Experimental): Promise<Experimental> {
    const uuid = uuidv7().toString()
    item = { ...item, id: uuid }
    return await this.ExpRepository.create(item)
  }

  async update(id: string, item: Partial<Experimental>): Promise<Experimental> {
    return this.ExpRepository.update(id, item)
  }

  async delete(id: string): Promise<Experimental> {
    return this.ExpRepository.delete(id)
  }
}
