import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User {
  @ApiProperty({ name: 'id' })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  @Expose({ name: 'id' })
  id: string

  @ApiProperty()
  @Column('varchar', { name: 'username', nullable: false })
  @Expose()
  username: string

  @ApiProperty()
  @Column('varchar', {
    name: 'password',
    nullable: false,
  })
  @Expose()
  password: string

  @ApiProperty()
  @Column('int', {
    name: 'status',
    nullable: false,
  })
  @Expose()
  status: number

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
