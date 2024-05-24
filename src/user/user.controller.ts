import { Controller, Get, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }

  @Get()
  findAll() {
    return this.userService.getUsers()
  }
}
