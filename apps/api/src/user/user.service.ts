import { LoginUserDto } from './dto/login-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@app/mysql/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'mysql')
    private readonly userRepository: Repository<User>,
  ) {}

  async register(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      username: dto.username,
    })

    if (user) {
      throw new BadRequestException('User is existed')
    }

    const entity = this.userRepository.create(dto)
    entity.status = 1
    const currentTime = new Date().getTime().toString()
    entity.createTime = currentTime
    entity.updateTime = currentTime
    await this.userRepository.save(entity)
  }

  async login(dto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      username: dto.username,
      password: dto.password,
    })

    if (!user) {
      throw new BadRequestException(
        'Wrong username or password or user not existed',
      )
    }

    return user.id
  }
}
