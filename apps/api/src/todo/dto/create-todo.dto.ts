import { Expose, Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateTodoDto {
         @IsNotEmpty()
         @Type(() => String)
         title: string

         @IsNotEmpty()
         @Type(() => String)
         content: string

         @Expose({ name: 'trigger_time' })
         @IsNotEmpty()
         @Type(() => String)
         triggerTime: string
       }
