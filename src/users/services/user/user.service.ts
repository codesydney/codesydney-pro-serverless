import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ReqUserDto, ResUserDto, UserDto } from 'src/types/user.dto'
import { UserRepository } from 'src/users/repository/repository'
import { Cryptography } from 'src/utils/cryptography/cryptography'
import { uuidv7 } from 'uuidv7'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private repository = new UserRepository(this.prisma)

  async findAllUsers(): Promise<ResUserDto[]> {
    return await this.repository.findAll()
  }

  async findUserById(id: string): Promise<ResUserDto> {
    return await this.repository.findById(id)
  }

  async findUserByEmail(email: string): Promise<ResUserDto> {
    return await this.repository.findByEmail(email)
  }

  async authUserByEmail(email: string): Promise<UserDto> {
    return await this.repository.findByEmail(email)
  }

  async createUser(userDto: UserDto): Promise<ResUserDto> {
    const cryptography = new Cryptography()
    const uuid = uuidv7().toString()
    userDto.id = uuid
    userDto.password = await cryptography.hashPassword(userDto.password)
    return await this.repository.createUser(userDto)
  }

  async updateUser(id: string, userDto: ReqUserDto): Promise<ResUserDto> {
    return await this.repository.updateUser(id, userDto)
  }

  async deleteUser(id: string): Promise<ResUserDto> {
    return await this.repository.deleteUser(id)
  }
}
