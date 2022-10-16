import { Expose, Type } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

export class CancelTodoDto {
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  id: number
}
