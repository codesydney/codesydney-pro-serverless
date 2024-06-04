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
import { ExperimentalService } from '../service/experimental.service'
import { Experimental, Tags } from '../repository/experimental.interface'

@Controller('api/v1/experimental')
export class ExperimentalController {
  constructor(private experimentalService: ExperimentalService) {}

  @Get('all')
  async getAllExp(): Promise<Experimental[] | null> {
    try {
      return await this.experimentalService.findAllExp()
    } catch (error) {
      throw error
    }
  }

  @Get('by-id/:id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Experimental> {
    try {
      return await this.experimentalService.findById(id)
    } catch (error) {
      throw error
    }
  }

  @Get('by-tag/:tag')
  async getByTag(@Param('tag') tag: Tags): Promise<Experimental[]> {
    try {
      return await this.experimentalService.findByUniqueTag(tag)
    } catch (error) {
      throw error
    }
  }

  @Post('create')
  async createExp(@Body() item: Experimental): Promise<Experimental> {
    try {
      return await this.experimentalService.create(item)
    } catch (error) {
      throw error
    }
  }

  @Put('update/:id')
  async updateExp(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() item: Experimental,
  ): Promise<Experimental> {
    try {
      return await this.experimentalService.update(id, item)
    } catch (error) {
      throw error
    }
  }

  @Delete('delete/:id')
  async deleteExp(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Experimental> {
    try {
      return await this.experimentalService.delete(id)
    } catch (error) {
      throw error
    }
  }
}
