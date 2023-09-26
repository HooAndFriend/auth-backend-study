// ** Common Imports
import {
  createAuthErrorData,
  createAuthWithRefreshErrorData,
  createErrorData,
  createSuccessData,
  createSuccessMessageData,
} from './common'

const CallResponse = {
  produce: {
    200: createSuccessMessageData(
      '전화번호 생성에 성공했습니다.',
      'Success produce',
    ),
    400: createErrorData(404, [
      {
        errorMessage: 'Invalid phone number format',
        description: '전화번호 양식에 맞지 않습니다',
      },
    ]),
  },
  modify: {
    200: createSuccessMessageData(
      '전화번호 수정에 성공했습니다.',
      'Success modify',
    ),
    404: createErrorData(404, [
      {
        errorMessage: 'Not Found Call',
        description: '전화번호를 찾을 수 없습니다.',
      },
    ]),
  },
  delete: {
    200: createSuccessMessageData(
      '전화번호 삭제에 성공했습니다.',
      'Success modify',
    ),
    404: createErrorData(404, [
      {
        errorMessage: 'Not Found Call',
        description: '전화번호를 찾을 수 없습니다.',
      },
    ]),
  },
  getOne: {
    200: createSuccessMessageData(
      '전화번호 단일조회에 성공했습니다.',
      'Success get One',
    ),
    404: createErrorData(404, [
      {
        errorMessage: 'Not Found Call',
        description: '전화번호를 찾을 수 없습니다.',
      },
    ]),
  },
  getList: {
    200: createSuccessMessageData(
      '전화번호 리스트조회에 성공했습니다.',
      'Success get List',
    ),
  },
}

export default CallResponse
