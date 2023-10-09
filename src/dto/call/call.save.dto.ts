// ** Validation Imports
import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'
import User from 'domain/user.entity'

export default class RequestCallSaveDto {
  @IsNotEmpty()
  @JSONSchema({ type: 'number', example: '1' })
  @IsInt()
  userId: User

  @IsNotEmpty()
  @JSONSchema({ type: 'string', example: '임동현' })
  @IsString()
  name: string

  @IsNotEmpty()
  @JSONSchema({ type: 'string', example: '010-1234-1234' })
  @IsString()
  number: string
}
