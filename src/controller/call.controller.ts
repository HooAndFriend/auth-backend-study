// ** Module Imports
import { OpenAPI } from 'routing-controllers-openapi'
import {
  Body,
  Get,
  JsonController,
  Post,
  Res,
  UseBefore,
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
import RequestCallDeleteDto from 'dto/call/call.delete.dto'
import RequestCallGetOneDto from 'dto/call/call.getOne.dto'
import RequestCallGetListDto from 'dto/call/call.getlist.dto'

@JsonController('/call')
@Service()
export default class CallController {
  constructor(private readonly callService: CallService) {}

  @Post('/produce')
  @OpenAPI({
    responses: CallResponse.produce,
    summary: '전화번호 등록',
  })
  public async produceCall(@Body() dto: RequestCallSaveDto) {
    return this.callService.saveCall(dto)
  }

  @Post('/modify')
  @OpenAPI({
    responses: CallResponse.modify,
    summary: '전화번호 수정',
  })
  public async modifyCall(@Body() dto: RequestCallModifyDto) {
    return this.callService.modifyCall(dto)
  }

  @Post('/delete')
  @OpenAPI({
    responses: CallResponse.delete,
    summary: '전화번호 삭제',
  })
  public async deleteCall(@Body() dto: RequestCallDeleteDto) {
    return this.callService.deleteCall(dto)
  }
  @Get('/getOne')
  @OpenAPI({
    responses: CallResponse.getOne,
    summary: '전화번호 단일 조회',
  })
  public async getOne(@Body() dto: RequestCallGetOneDto) {
    return this.callService.getOneCall(dto)
  }
  @Get('/getList')
  @OpenAPI({
    responses: CallResponse.getList,
    summary: '전화번호 리스트 조회',
  })
  public async getList(@Body() dto: RequestCallGetListDto) {
    return this.callService.getListCall(dto)
  }
}
