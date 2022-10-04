import { CancelTodoDto } from './dto/cancel-todo.dto'
import { GetListTodoDto } from './dto/get-list-todo.dto'
import { Task } from '@app/mysql/entities/task.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Todo } from './interfaces/todo.interface'
import { CreateTodoDto } from './dto/create-todo.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOperator, MoreThan, Not, Repository } from 'typeorm'
import { classToPlain, instanceToPlain } from 'class-transformer'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Task, 'mysql')
    private readonly taskRepository: Repository<Task>,
  ) {}

  findOne(id: string) {
    console.log('id dans service :', id)
    // return this.todos.find(todo => todo.id === Number(id))
  }

  async getListTask(dto: GetListTodoDto) {
    const where = !dto.id
      ? {
          id: MoreThan(dto.id),
          status: 1,
        }
      : {
          status: 1,
        }
    const listTask = await this.taskRepository.find({
      where: where,
      take: 10,
    })
    return instanceToPlain(listTask)
  }

  async create(todo: CreateTodoDto) {
    const entity = this.taskRepository.create(todo)
    const currentTime = new Date().getTime().toString()
    entity.createTime = currentTime
    entity.updateTime = currentTime
    await this.taskRepository.save(entity)
  }

  async cancel(todo: CancelTodoDto) {
    await this.taskRepository.update(
      {
        ...todo,
        status: 1,
      },
      {
        status: 3,
      },
    )
  }
}
