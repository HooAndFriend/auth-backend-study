// ** Validation Imports
import { IsNotEmpty, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export default class RequestUserTokenReissueDto {
  @IsNotEmpty()
  @JSONSchema({ type: 'string', example: 'edasdasdasd123asd' })
  @IsString()
  refreshToken: string
}
