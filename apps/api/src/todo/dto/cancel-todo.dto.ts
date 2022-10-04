import { Expose, Type } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

export class CancelTodoDto {
  @Expose({ name: 'user_id' })
  @IsNotEmpty()
  @Type(() => Number)
  userId: number

  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  id: number
}
