// ** Module Imports
import { Service } from 'typedi'
import { BadRequestError, NotFoundError } from 'routing-controllers'

// ** Custom Module Imports
import CallRepository from 'repository/call.repository'
import RequestCallSaveDto from 'dto/call/call.save.dto'
import RequestCallModifyDto from 'dto/call/call.modify.dto'

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
      throw new NotFoundError('Call does not exists')
    }

    const result = await this.callRepository.dataSource.update(dto.id, {
      name: dto.name,
      number: dto.number,
    })

    return CommonResponse.of({
      message: '전화번호 수정에 성공했습니다.',
      statusCode: 200,
      data: result,
    })
  }
  /**
   * 전화삭제
   */
  public async deleteCall(id: number) {
    const findCall = await this.callRepository.dataSource.findOne({
      where: { id: id },
    })

    if (!findCall) {
      throw new NotFoundError('Call does not exists')
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
  public async getOneCall(id: number) {
    const findCall = await this.callRepository.dataSource.findOne({
      where: { id: id },
    })

    if (!findCall) {
      throw new NotFoundError('Call does not exists')
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
  public async getListCall(name: string) {
    const [calls, count] = await this.callRepository.findCallsByName(name)

    return CommonResponse.of({
      message: '전화번호 리스트조회에 성공했습니다.',
      statusCode: 200,
      data: {
        calls,
        count,
      },
    })
  }
}
