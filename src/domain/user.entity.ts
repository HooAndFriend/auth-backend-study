// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

// ** Enum, Entity Imports
import BaseTimeEntity from 'common/entity/BaseTime.Entity'

@Entity({ name: 'TB_USER' })
@Unique(['username'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, length: 100, comment: '이메일' })
  username: string

  @Column({ nullable: true, length: 150, comment: '패스워드' })
  password: string
}
