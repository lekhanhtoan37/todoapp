import { TodoModule } from './todo/todo.module'
import { Task } from '@app/mysql/entities/task.entity'
import { TodoController } from './todo/todo.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'
import { TodoService } from './todo/todo.service'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      name: 'mysql',
      imports: [],
      useFactory: () => ({
        type: 'mysql',
        logging: !!process.env.LOG_QUERY,
        replication: {
          master: {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
          },
          slaves: [
            {
              host: process.env.DB_HOST,
              port: +process.env.DB_PORT,
              username: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_DATABASE,
            },
          ],
        },
        autoLoadEntities: true,
        entities: [Task],
        synchronize: false,
        keepConnectionAlive: true,
      }),
    }),
    TodoModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
