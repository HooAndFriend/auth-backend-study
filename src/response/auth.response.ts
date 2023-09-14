// ** Common Imports
import {
  createAuthErrorData,
  createAuthWithRefreshErrorData,
  createErrorData,
  createSuccessData,
  createSuccessMessageData,
} from './common'

const AuthResponse = {
  localLogin: {
    200: createSuccessData(
      {
        user: {
          id: 1,
          email: 'inhoo987654321@gmail.com',
          socialType: 'LOCAL',
          phone: '+8201063057848',
          firstName: 'pino',
          lastName: 'maker',
          status: 'ACTIVE',
          lang: 'ko',
          os: 'AOS',
        },
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJVU0VSIiwiaWF0IjoxNjkwMzU4MjkzLCJleHAiOjE2OTI5NTAyOTN9.JPIc_QrNo2WTpOEmR6sSFIt4Tc9lXOBLWVaMw98G0jc',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJVU0VSIiwiaWF0IjoxNjkwMzU4MjkzLCJleHAiOjE2OTAzNjE4OTN9.YtBrXs0aH6hcyPXs2GMoNRJwHa8eB6zDG64fiPgvdhM',
        },
      },
      '로그인에 성공했습니다.',
      'Success Login',
    ),
    404: createErrorData(404, [
      {
        errorMessage: 'Not Found User',
        description: '이메일을 찾을 수 없습니다.',
      },
    ]),
    400: createErrorData(400, [
      {
        errorMessage: 'E-mail verification is required to log-in',
        description: '이메일 인증이 되지 않았습니다.',
      },
      {
        errorMessage: 'This account has been deactivated',
        description: '정지되거나 삭제된 유저 입니다.',
      },
      {
        errorMessage: 'Password not correct',
        description: '패스워드가 일치하지 않습니다.',
      },
    ]),
  },
  socialLogin: {
    200: createSuccessData(
      {
        user: {
          id: 2,
          email: 'test1@test.com',
          socialType: 'FACEBOOK',
          phone: '+8201063057840',
          firstName: 'pino',
          lastName: 'maker',
          status: 'ACTIVE',
          lang: 'en',
          os: 'AOS',
        },
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInR5cGUiOiJVU0VSIiwiaWF0IjoxNjkwMzU4MzMyLCJleHAiOjE2OTI5NTAzMzJ9.ur1pi5_1DftldqeBUg38nigCKJ_PW90_LZ_NmJjjfJM',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInR5cGUiOiJVU0VSIiwiaWF0IjoxNjkwMzU4MzMyLCJleHAiOjE2OTAzNjE5MzJ9.Zbl4Y46PUFfn3N3xHtzqUv6A08G344hLFnRXRYhMtXE',
        },
      },
      '로그인에 성공했습니다.',
      'Success Login',
    ),
    404: createErrorData(404, [
      {
        errorMessage: 'Not Found User',
        description: '유저를 찾을 수 없습니다.',
      },
    ]),
    400: createErrorData(400, [
      {
        errorMessage: 'E-mail verification is required to log-in',
        description: '이메일 인증이 되지 않았습니다.',
      },
      {
        errorMessage: 'This account has been deactivated',
        description: '정지되거나 삭제된 유저 입니다.',
      },
    ]),
  },
  register: {
    200: createSuccessMessageData(
      '회원가입에 성공했습니다.',
      'Success Register',
    ),
    400: createErrorData(400, [
      {
        errorMessage: 'Email already exists.',
        description: '이미 사용 중인 Email 입니다.',
      },
      {
        errorMessage: 'Phone already exists.',
        description: '이미 사용 중인 전화번호 입니다.',
      },
      {
        errorMessage: 'Social Token already exists.',
        description: '이미 사용 중인 소셜 토큰 입니다.',
      },
    ]),
  },
  reissue: {
    200: createSuccessData(
      {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4ODg5ODA1OCwiZXhwIjoxNjkxNDkwMDU4fQ.vkE7FB-KutL88NVuilVfNawLR4o8xc25F0GtsS3h3Ls',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4ODg5ODA1OCwiZXhwIjoxNjg4OTAxNjU4fQ.frbkks43-0ELJbY-IllqA59Be8fS1XotQxNTVBBRqho',
      },
      '토큰 재발급에 성공했습니다.',
      'Success Reissued Token',
    ),
    401: createAuthWithRefreshErrorData(),
    404: createErrorData(404, [
      {
        errorMessage: 'Not Found User By Token Info',
        description: '유저를 찾을 수 없습니다.',
      },
    ]),
  },
  adminRegister: {
    200: createSuccessMessageData(
      '관리자 추가를 성공했습니다.',
      'Success Save Admin',
    ),
    400: createErrorData(400, [
      {
        errorMessage: '이미 사용 중인 ID 입니다.',
        description: '이미 사용 중인 ID 입니다.',
      },
    ]),
    401: createAuthErrorData(),
  },
  adminLogin: {
    200: createSuccessData(
      {
        data: {
          user: {
            regDate: '2023-07-09T01:50:37.228Z',
            modDate: '2023-07-09T01:50:37.228Z',
            id: 1,
            username: 'admin',
            password:
              '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
            grade: 'MASTER',
          },
          token: {
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJBRE1JTiIsImlhdCI6MTY4ODkwMDU0NywiZXhwIjoxNjkxNDkyNTQ3fQ.6rms_jXrGJPOeuDVDHFqM6Qgi9U0zAV5ZAWBuRhls38',
            refreshToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4ODkwMDU0NywiZXhwIjoxNjg4OTA0MTQ3fQ.Lhjfks1PPBvZ454sG43c_zMPeEiCdqHNwSLaTe-JVfI',
          },
        },
        statusCode: 200,
        message: '로그인을 성공했습니다.',
      },
      '로그인을 성공했습니다.',
      '로그인을 성공했습니다.',
    ),
    400: createErrorData(400, [
      {
        errorMessage: '비밀번호가 일치하지 않습니다.',
        description: '비밀번호가 일치하지 않습니다.',
      },
    ]),
    404: createErrorData(404, [
      {
        errorMessage: '관리자를 찾을 수 없습니다.',
        description: '관리자를 찾을 수 없습니다.',
      },
    ]),
  },
  findEmail: {
    200: createSuccessData(
      {
        email: 'test@test.com',
      },
      '이메일 찾기에 성공했습니다.',
      'Success Find Email',
    ),
    404: createErrorData(404, [
      {
        errorMessage: 'Not Found User',
        description: '유저를 찾을 수 없습니다.',
      },
    ]),
  },
  findPassword: {
    200: createSuccessMessageData(
      '패스워드 초기화 이메일을 발송하였습니다.',
      'Success Send Email For Reset Password',
    ),
    404: createErrorData(404, [
      {
        errorMessage: 'Not Found User',
        description: '유저를 찾을 수 없습니다.',
      },
    ]),
  },
  changePassword: {
    200: createSuccessMessageData(
      '패스워드 변경에 성공했습니다.',
      'Success Change Password',
    ),
    404: createErrorData(404, [
      {
        errorMessage: 'Not Found User',
        description: '유저를 찾을 수 없습니다.',
      },
    ]),
  },
}

export default AuthResponse
