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
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  findAll(@Query() dto: GetListTodoDto) {
    return this.todoService.getListTask(dto)
  }

  @Post()
  createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.create(dto)
  }

  @Post('/cancel')
  cancelTodo(@Body() dto: CancelTodoDto) {
    return this.todoService.cancel(dto)
  }
}
