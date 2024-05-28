import { PrismaClient, User } from '@prisma/client'
import { ReqUserDto, UserDto } from 'src/types/user.dto'

// This is a domain level repository where we can manually switch the DB dependency/engine
// I.e. Prisma, or any typeORM or just native DB driver such as PostgreSQL, MySQL or SQLlite
// It still not fully decoupled but it's a step closer to have generic support for the examples above
// A More sophisticated way is to build a generic class with generic dependency types
export class UserRepository {
  repository: PrismaClient

  constructor(repository: PrismaClient) {
    this.repository = repository
  }

  async findAll(): Promise<User[]> {
    return await this.repository.user.findMany()
  }

  async findById(id: string): Promise<User> {
    return await this.repository.user.findUnique({ where: { id: id } })
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.user.findUnique({ where: { email: email } })
  }

  async createUser(user: UserDto): Promise<User> {
    return await this.repository.user.create({ data: user })
  }

  async updateUser(id: string, user: ReqUserDto): Promise<User> {
    return await this.repository.user.update({ where: { id: id }, data: user })
  }

  async updateUserRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<User> {
    return await this.repository.user.update({
      where: { id: id },
      data: { refreshToken: refreshToken },
    })
  }

  async deleteUser(id: string): Promise<User> {
    return await this.repository.user.delete({ where: { id: id } })
  }
}
