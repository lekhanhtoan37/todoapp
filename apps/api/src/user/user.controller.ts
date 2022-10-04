import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() dto: CreateUserDto) {
    await this.userService.register(dto)
    return { message: 'OK', status_code: 200, data: {} }
  }

  @Post()
  async login(@Body() dto: CreateUserDto) {
    const id = await this.userService.login(dto)
    return { message: 'OK', status_code: 200, data: { user_id: id } }
  }
}
