import { User } from '@app/mysql/entities/user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User], 'mysql')],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
