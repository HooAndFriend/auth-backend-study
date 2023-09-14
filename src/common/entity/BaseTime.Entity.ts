// ** Typeorm Imports
import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export default abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn({ comment: '생성 날짜', name: 'reg_date' })
  regDate: Date

  @UpdateDateColumn({ comment: '수정 날짜', name: 'mod_date' })
  modDate: Date
}
