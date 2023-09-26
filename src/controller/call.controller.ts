// ** Module Imports
import { OpenAPI } from 'routing-controllers-openapi'
import {
  Body,
  Get,
  JsonController,
  Post,
  Put,
  Delete,
  Res,
  UseBefore,
  Param,
  QueryParam,
} from 'routing-controllers'
import { Service } from 'typedi'

// ** Express Imports
import { Response } from 'express'

// ** Custom Module Imports
import CallService from 'service/call.service'

// ** Middleware Imports
import { checkRefreshToken } from 'middleware/AuthMiddleware'

// ** Dto Imports
import CallResponse from 'response/call.response'
import RequestCallSaveDto from 'dto/call/call.save.dto'
import RequestCallModifyDto from 'dto/call/call.modify.dto'

@JsonController('/call')
@Service()
export default class CallController {
  constructor(private readonly callService: CallService) {}

  @Post()
  @OpenAPI({
    responses: CallResponse.produce,
    summary: '전화번호 등록',
  })
  public async produceCall(@Body() dto: RequestCallSaveDto) {
    return await this.callService.saveCall(dto)
  }

  @Put()
  @OpenAPI({
    responses: CallResponse.modify,
    summary: '전화번호 수정',
  })
  public async modifyCall(@Body() dto: RequestCallModifyDto) {
    return this.callService.modifyCall(dto)
  }

  @Delete(':id')
  @OpenAPI({
    responses: CallResponse.delete,
    summary: '전화번호 삭제',
  })
  public async deleteCall(@Param('id') id: number) {
    return await this.callService.deleteCall(id)
  }
  @Get(':id')
  @OpenAPI({
    responses: CallResponse.getOne,
    summary: '전화번호 단일 조회',
  })
  public async getOne(@Param('id') id: number) {
    return await this.callService.getOneCall(id)
  }
  @Get()
  @OpenAPI({
    responses: CallResponse.getList,
    summary: '전화번호 리스트 조회',
  })
  public async getList(@QueryParam('name') name: string) {
    return await this.callService.getListCall(name)
  }
}
