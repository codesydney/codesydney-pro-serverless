import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { Public } from 'src/decorators/public.decorators'
import { ReqUserDto, ResUserDto, UserDto } from 'src/types/user.dto'
import { UserService } from 'src/users/services/user/user.service'

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  // Fastify requires to declare endpoint identifier i.e. all or update, by-id etc
  @Get('all')
  async getAllUsers(): Promise<ResUserDto[] | null> {
    try {
      return await this.userService.findAllUsers()
    } catch (error) {
      // TODO: Add a generic error handler class
      throw error
    }
  }

  @Get('by-id/:id')
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResUserDto> {
    try {
      return await this.userService.findUserById(id)
    } catch (error) {
      throw error
    }
  }

  @Get('by-email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<ResUserDto> {
    try {
      return await this.userService.findUserByEmail(email)
    } catch (error) {
      throw error
    }
  }

  // Because the routers are guarded/protected globally
  // We must annotate @public() any public endpoint
  @Public()
  @Post('create')
  async createUser(@Body() userDto: UserDto): Promise<ResUserDto> {
    try {
      return await this.userService.createUser(userDto)
    } catch (error) {
      throw error
    }
  }

  @Put('update/:id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userDto: ReqUserDto,
  ): Promise<ResUserDto> {
    try {
      return this.userService.updateUser(id, userDto)
    } catch (error) {
      throw error
    }
  }

  @Delete('delete/:id')
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResUserDto> {
    try {
      return this.userService.deleteUser(id)
    } catch (error) {
      throw error
    }
  }
}
