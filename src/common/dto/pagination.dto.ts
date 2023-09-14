import { Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export class Pagination {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @JSONSchema({ type: 'number', example: 0 })
  page: number = 0

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @JSONSchema({ type: 'number', example: 10 })
  pageSize: number = 10
}
