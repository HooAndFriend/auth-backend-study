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
  },
  modify: {
    200: createSuccessMessageData(
      '전화번호 수정에 성공했습니다.',
      'Success modify',
    ),
  },
  delete: {
    200: createSuccessMessageData(
      '전화번호 삭제에 성공했습니다.',
      'Success modify',
    ),
  },
  getOne: {
    200: createSuccessMessageData(
      '전화번호 단일조회에 성공했습니다.',
      'Success get One',
    ),
  },
  getList: {
    200: createSuccessMessageData(
      '전화번호 리스트조회에 성공했습니다.',
      'Success get List',
    ),
  },
}

export default CallResponse
