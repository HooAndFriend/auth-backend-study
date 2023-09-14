export const createErrorData = (
  errorStatus: number,
  errorDataList: {
    errorMessage: string
    description?: string
  }[],
) => {
  if (errorDataList.length > 1) {
    const examples = errorDataList.reduce((acc, cur, i) => {
      const { errorMessage, description } = cur
      return {
        ...acc,
        [`${errorStatus}_${i + 1}`]: {
          value: { message: errorMessage, errorStatus },
          description,
        },
      }
    }, {})
    return {
      description: 'Error defined case.',
      content: {
        'application/json': {
          examples,
        },
      },
    }
  }
  const [{ errorMessage, description }] = errorDataList
  return {
    description,
    content: {
      'application/json': {
        example: {
          message: errorMessage,
          statusCode: errorStatus,
        },
      },
    },
  }
}

export const createAuthErrorData = () => {
  const errorStatus = 401
  const errorDataList = [
    {
      errorMessage: 'Invalid or Missing Access JWT token',
      description: 'Access Token가 유효하지 않음',
    },
    {
      errorMessage: 'Access JWT token has expired',
      description: 'Access Token 유효기간 만료',
    },
  ]
  if (errorDataList.length > 1) {
    const examples = errorDataList.reduce((acc, cur, i) => {
      const { errorMessage, description } = cur
      return {
        ...acc,
        [`${errorStatus}_${i + 1}`]: {
          value: { message: errorMessage, errorStatus },
          description,
        },
      }
    }, {})
    return {
      description: 'Error defined case.',
      content: {
        'application/json': {
          examples,
        },
      },
    }
  }
  const [{ errorMessage, description }] = errorDataList
  return {
    description,
    content: {
      'application/json': {
        example: {
          message: errorMessage,
          statusCode: errorStatus,
        },
      },
    },
  }
}

export const createAuthWithRefreshErrorData = () => {
  const errorStatus = 401
  const errorDataList = [
    {
      errorMessage: 'Invalid or Missing Access JWT token',
      description: 'Access Token가 유효하지 않음',
    },
    {
      errorMessage: 'Access JWT token has expired',
      description: 'Access Token 유효기간 만료',
    },
    {
      errorMessage: 'Invalid or Missing Refresh JWT token',
      description: 'Refresh Token가 유효하지 않음',
    },
    {
      errorMessage: 'Refresh JWT token has expired',
      description: 'Refresh Token가 유효기간 만료',
    },
  ]
  if (errorDataList.length > 1) {
    const examples = errorDataList.reduce((acc, cur, i) => {
      const { errorMessage, description } = cur
      return {
        ...acc,
        [`${errorStatus}_${i + 1}`]: {
          value: { message: errorMessage, errorStatus },
          description,
        },
      }
    }, {})
    return {
      description: '인증 오류',
      content: {
        'application/json': {
          examples,
        },
      },
    }
  }
  const [{ errorMessage, description }] = errorDataList
  return {
    description,
    content: {
      'application/json': {
        example: {
          message: errorMessage,
          statusCode: errorStatus,
        },
      },
    },
  }
}

export const createSuccessData = (
  data: any,
  description: string,
  message: string,
) => {
  return {
    description,
    content: {
      'application/json': {
        example: {
          data: data,
          statusCode: 200,
          message,
        },
      },
    },
  }
}

export const createSuccessMessageData = (
  description: string,
  message: string,
) => {
  return {
    description,
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          message,
        },
      },
    },
  }
}

export const HTTP_STATUS_CODE = {
  SUCCESS_REQUEST: 200,
  BAD_REQUEST: 400,
  FORBIDEN_REQUEST: 403,
  NOT_FOUND: 404,
}
