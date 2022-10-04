import { Expose, Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateTodoDto {
         @Expose({ name: 'user_id' })
         @IsNotEmpty()
         @Type(() => Number)
         userId: number

         @IsNotEmpty()
         @Type(() => String)
         title: string

         @IsNotEmpty()
         @Type(() => Number)
         @IsIn([1, 2, 3]) // 1 pending, 2 done, 3 cancel
         status: number

         @IsNotEmpty()
         @Type(() => String)
         content: string

         @Expose({ name: 'trigger_time' })
         @IsNotEmpty()
         @Type(() => String)
         triggerTime: string
       }
