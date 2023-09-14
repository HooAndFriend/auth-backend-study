// ** Module Imports
import { OpenAPI } from 'routing-controllers-openapi'
import { Body, JsonController, Post, Res, UseBefore } from 'routing-controllers'
import { Service } from 'typedi'

// ** Express Imports
import { Response } from 'express'

// ** Custom Module Imports
import UserService from 'service/user.service'

// ** Middleware Imports
import { checkRefreshToken } from 'middleware/AuthMiddleware'

// ** Dto Imports
import AuthResponse from 'response/auth.response'
import RequestUserLocalLoginDto from 'dto/user/user.local.login.dto'
import RequestUserSaveDto from 'dto/user/user.save.dto'
import RequestUserTokenReissueDto from 'dto/user/user.token.dto'

@JsonController('/auth')
@Service()
export default class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @OpenAPI({
    responses: AuthResponse.localLogin,
    summary: '사용자 로그인',
  })
  public async localLogin(@Body() dto: RequestUserLocalLoginDto) {
    return this.userService.localLogin(dto)
  }

  @Post()
  @OpenAPI({
    responses: AuthResponse.register,
    summary: '회원가입',
  })
  public async register(@Body() dto: RequestUserSaveDto) {
    return this.userService.saveUser(dto)
  }

  @Post('/reissue')
  @OpenAPI({
    responses: AuthResponse.reissue,
    summary: 'Access Token 재발급',
  })
  @UseBefore(checkRefreshToken)
  public async reissue(
    @Body() dto: RequestUserTokenReissueDto,
    @Res() res: Response,
  ) {
    return this.userService.reissueToken(res.locals.jwtPayload.userId)
  }
}
