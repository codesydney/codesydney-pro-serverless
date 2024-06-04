import { PrismaClient } from '@prisma/client'
import { Experimental } from '@prisma/client' // In here Experimental is the Prisma model
import { PrismaGenericRepository } from './prima-generic-repository'

export class PrismaRepositoryImpl extends PrismaGenericRepository<Experimental> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.experimental)
  }
}
