// ** Validation Imports
import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export default class RequestCallGetListDto {
  @IsNotEmpty()
  @JSONSchema({ type: 'string', example: '임동현' })
  @IsString()
  name: string
}
