// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

// ** Enum, Entity Imports
import BaseTimeEntity from 'common/entity/BaseTime.Entity'

@Entity({ name: 'TB_CALL' })
@Unique(['id'])
export default class Call extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, length: 100, comment: '이름' })
  name: string

  @Column({ nullable: true, length: 150, comment: '전화번호' })
  number: string
}
