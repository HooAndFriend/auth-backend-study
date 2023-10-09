// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

// ** Enum, Entity Imports
import BaseTimeEntity from 'common/entity/BaseTime.Entity'
import User from 'domain/user.entity'

@Entity({ name: 'TB_CALL' })
export default class Call extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, length: 100, comment: '이름' })
  name: string

  @Column({ nullable: true, length: 150, comment: '전화번호' })
  number: string

  @ManyToOne((type) => User, (user) => user.calls)
  user: User
}
