import { TodoStatus } from './../todo.enum'
import { IsIn, IsNumber, IsOptional } from 'class-validator'
import { isOptionalChain } from 'typescript'
import { Type } from 'class-transformer'

export class GetListTodoDto {
         @IsOptional()
         id: number

         @IsOptional()
         @Type(() => Number)
         @IsIn([TodoStatus.Cancel, TodoStatus.Done, TodoStatus.Pending])
         status: number

         @IsOptional()
         @Type(() => Number)
         take: number
       }
