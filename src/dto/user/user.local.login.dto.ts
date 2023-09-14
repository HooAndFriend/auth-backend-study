// ** Validation Imports
import { IsNotEmpty, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export default class RequestUserLocalLoginDto {
  @IsNotEmpty()
  @JSONSchema({ type: 'string', example: 'admin' })
  @IsString()
  username: string

  @IsNotEmpty()
  @JSONSchema({ type: 'string', example: '1234' })
  @IsString()
  password: string
}
