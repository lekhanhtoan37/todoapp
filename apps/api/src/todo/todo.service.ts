import { TodoStatus } from './todo.enum'
import { CancelTodoDto } from './dto/cancel-todo.dto'
import { GetListTodoDto } from './dto/get-list-todo.dto'
import { Task } from '@app/mysql/entities/task.entity'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Todo } from './interfaces/todo.interface'
import { CreateTodoDto } from './dto/create-todo.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOperator, LessThan, MoreThan, Not, Repository } from 'typeorm'
import { classToPlain, instanceToPlain } from 'class-transformer'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Task, 'mysql')
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getListTask(dto: GetListTodoDto, userId: string) {
    const where = dto.id
      ? {
          id: MoreThan(dto.id),
          userId: +userId,
          status: dto.status,
        }
      : {
          userId: +userId,
          status: dto.status,
        }
    const listTask = await this.taskRepository.find({
      where: where,
      take: dto.take ? dto.take : 10,
    })
    return instanceToPlain(listTask)
  }

  async create(todo: CreateTodoDto, userId: string) {
    const entity = this.taskRepository.create(todo)
    entity.userId = +userId
    entity.status = TodoStatus.Pending
    const currentTime = new Date().getTime().toString()
    entity.createTime = currentTime
    entity.updateTime = currentTime
    await this.taskRepository.save(entity)
    return await this.taskRepository.findOne(entity)
  }

  async cancel(todo: CancelTodoDto, userId: string) {
    const res = await this.taskRepository.update(
      {
        ...todo,
        userId: +userId,
        triggerTime: LessThan(new Date().getTime().toString()),
        status: TodoStatus.Pending,
      },
      {
        status: TodoStatus.Cancel,
      },
    )

    if (res.affected == 0) {
      throw new BadRequestException('Task is not Pending or already Done')
    }
  }
}
