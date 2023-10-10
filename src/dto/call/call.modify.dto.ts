// ** Validation Imports
import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export default class RequestCallModifyDto {
  @IsNotEmpty()
  @JSONSchema({ type: 'number', example: '1' })
  @IsInt()
  id: number

  @IsNotEmpty()
  @JSONSchema({ type: 'string', example: '임동현' })
  @IsString()
  name: string

  @IsNotEmpty()
  @JSONSchema({ type: 'string', example: '010-1234-1234' })
  @IsString()
  number: string

  @IsNotEmpty()
  @JSONSchema({ type: 'number', example: '1' })
  @IsInt()
  userId: number
}
