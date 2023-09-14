// ** Module Imports
import { Service } from 'typedi'
import { BadRequestError, NotFoundError } from 'routing-controllers'

// ** Custom Module Imports
import UserRepository from 'repository/user.repository'
import RequestUserSaveDto from 'dto/user/user.save.dto'

// ** Utils Imports
import { createHash } from 'crypto'
import { generateToken } from 'middleware/AuthMiddleware'

// ** Dto, entity Imports
import CommonResponse from 'common/dto/api.response'
import RequestUserLocalLoginDto from 'dto/user/user.local.login.dto'

@Service()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * 회원가입
   */
  public async saveUser(dto: RequestUserSaveDto) {
    const findUser = await this.userRepository.dataSource.findOne({
      where: { username: dto.username },
    })

    if (findUser) {
      throw new BadRequestError('Email already exists')
    }

    const hash = dto.password
      ? createHash('sha256').update(dto.password).digest('hex')
      : null

    await this.userRepository.dataSource.save(
      this.userRepository.dataSource.create({
        username: dto.username,
        password: hash,
      }),
    )

    return CommonResponse.of({
      message: '회원가입에 성공했습니다.',
      statusCode: 200,
    })
  }

  /**
   * 로컬 로그인
   */
  public async localLogin(dto: RequestUserLocalLoginDto) {
    const findUser = await this.userRepository.findUserForLogin(dto.username)

    if (!findUser) {
      throw new NotFoundError('Not Found User')
    }

    if (
      findUser.password !==
      createHash('sha256').update(dto.password).digest('hex')
    ) {
      throw new BadRequestError('Password not correct')
    }

    const token = generateToken(findUser)

    return CommonResponse.of({
      data: {
        user: findUser,
        token,
      },
      statusCode: 200,
      message: 'Success Login',
    })
  }

  /**
   * 토큰 재발급
   */
  public async reissueToken(userId: number) {
    const findUser = await this.userRepository.dataSource.findOne({
      where: { id: userId },
    })

    if (!findUser) {
      throw new NotFoundError('Not Found User By Token Info')
    }
    const token = generateToken(findUser)

    return CommonResponse.of({
      data: token,
      statusCode: 200,
      message: '토큰 재발급에 성공하였습니다.',
    })
  }
}
