// ** Module Imports
import { Service } from 'typedi'
import { BadRequestError, NotFoundError } from 'routing-controllers'

// ** Custom Module Imports
import CallRepository from 'repository/call.repository'
import RequestCallSaveDto from 'dto/call/call.save.dto'
import RequestCallModifyDto from 'dto/call/call.modify.dto'
import RequestCallDeleteDto from 'dto/call/call.delete.dto'
import RequestCallGetOneDto from 'dto/call/call.getOne.dto'
import RequestCallGetListDto from 'dto/call/call.getlist.dto'

// ** Utils Imports
import { createHash } from 'crypto'
import { generateToken } from 'middleware/AuthMiddleware'

// ** Dto, entity Imports
import CommonResponse from 'common/dto/api.response'
import RequestUserLocalLoginDto from 'dto/user/user.local.login.dto'

@Service()
export default class CallService {
  constructor(private readonly callRepository: CallRepository) {}

  /**
   * 전화등록
   */
  public async saveCall(dto: RequestCallSaveDto) {
    await this.callRepository.dataSource.save(
      this.callRepository.dataSource.create({
        name: dto.name,
        number: dto.number,
      }),
    )

    return CommonResponse.of({
      message: '전화번호 등록에 성공했습니다.',
      statusCode: 200,
    })
  }
  /**
   * 전화수정
   */
  public async modifyCall(dto: RequestCallModifyDto) {
    const findCall = await this.callRepository.dataSource.findOne({
      where: { id: dto.id },
    })

    if (!findCall) {
      throw new BadRequestError('Call does not exists')
    }

    findCall.name = dto.name
    findCall.number = dto.number

    await this.callRepository.dataSource.save(findCall)

    return CommonResponse.of({
      message: '전화번호 수정에 성공했습니다.',
      statusCode: 200,
    })
  }
  /**
   * 전화삭제
   */
  public async deleteCall(dto: RequestCallDeleteDto) {
    const findCall = await this.callRepository.dataSource.findOne({
      where: { id: dto.id },
    })

    if (!findCall) {
      throw new BadRequestError('Call does not exists')
    }

    await this.callRepository.dataSource.remove(findCall)

    return CommonResponse.of({
      message: '전화번호 삭제에 성공했습니다.',
      statusCode: 200,
    })
  }
  /**
   * 전화단일조회
   */
  public async getOneCall(dto: RequestCallGetOneDto) {
    const findCall = await this.callRepository.dataSource.findOne({
      where: { id: dto.id },
    })

    if (!findCall) {
      throw new BadRequestError('Call does not exists')
    }

    return CommonResponse.of({
      message: '전화번호 단일조회에 성공했습니다.',
      statusCode: 200,
      data: findCall,
    })
  }
  /**
   * 전화리스트조회
   */
  public async getListCall(dto: RequestCallGetListDto) {
    const findCalls = await this.callRepository.dataSource.find({
      where: { name: dto.name },
    })

    if (findCalls.length == 0) {
      throw new BadRequestError('Call does not exists')
    }

    return CommonResponse.of({
      message: '전화번호 리스트조회에 성공했습니다.',
      statusCode: 200,
      data: findCalls,
    })
  }
}
