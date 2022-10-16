import { instanceToPlain, plainToInstance } from 'class-transformer'
import { CancelTodoDto } from './dto/cancel-todo.dto'
import { GetListTodoDto } from './dto/get-list-todo.dto'
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Headers,
  UnauthorizedException,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { create } from 'domain'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(
    @Headers('user_id') userId: string,
    @Query() dto: GetListTodoDto,
  ) {
    if (!userId) {
      throw new UnauthorizedException('User_id not found')
    }
    const data = await this.todoService.getListTask(dto, userId)
    return { ms: 'Successfully', data: instanceToPlain(data) }
  }

  @Post('/create')
  async createTodo(
    @Headers('user_id') userId: string,
    @Body() dto: CreateTodoDto,
  ) {
    if (!userId) {
      throw new UnauthorizedException('User_id not found')
    }

    const createdTodo = await this.todoService.create(dto, userId)
    return { ms: 'Successfully', data: instanceToPlain(createdTodo) }
  }

  @Post('/cancel')
  async cancelTodo(
    @Headers('user_id') userId: string,
    @Body() dto: CancelTodoDto,
  ) {
    if (!userId) {
      throw new UnauthorizedException('User_id not found')
    }

    await this.todoService.cancel(dto, userId)
    return { ms: 'Successfully', data: {} }
  }
}
