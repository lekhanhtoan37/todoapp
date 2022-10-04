import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('task')
export class Task {
  @ApiProperty({ name: 'id' })
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
  @Expose({ name: 'id' })
  id: number

  @ApiProperty()
  @Column('varchar', { name: 'title', nullable: false })
  @Expose()
  title: string

  @ApiProperty()
  @Column('varchar', {
    name: 'content',
    nullable: true,
  })
  @Expose()
  content: string

  @ApiProperty()
  @Column('int', {
    name: 'status',
    nullable: false,
  })
  @Expose()
  status: number

  @ApiProperty({ name: 'trigger_time' })
  @Column('bigint', {
    name: 'trigger_time',
    nullable: true,
    comment: 'UTC time ticks',
  })
  @Expose({ name: 'trigger_time' })
  triggerTime: string

  @ApiProperty({ name: 'create_time' })
  @Column('bigint', {
    name: 'create_time',
    nullable: false,
    comment: 'UTC time ticks',
  })
  @Expose({ name: 'create_time' })
  createTime: string

  @ApiProperty({ name: 'update_time' })
  @Column('bigint', {
    name: 'update_time',
    nullable: false,
    comment: 'UTC time ticks',
  })
  @Expose({ name: 'update_time' })
  updateTime: string
}
