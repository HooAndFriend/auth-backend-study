// ** Validation Imports
import { IsNotEmpty, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export default class RequestCallSaveDto {
  @IsNotEmpty()
  @JSONSchema({ type: 'string', example: '임동현' })
  @IsString()
  name: string

  @IsNotEmpty()
  @JSONSchema({ type: 'string', example: '010-1234-1234' })
  @IsString()
  number: string
}
