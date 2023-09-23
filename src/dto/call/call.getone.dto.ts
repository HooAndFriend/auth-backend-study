// ** Validation Imports
import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export default class RequestCallGetOneDto {
  @IsNotEmpty()
  @JSONSchema({ type: 'number', example: '1' })
  @IsInt()
  id: number
}