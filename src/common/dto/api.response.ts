// ** Nest Imports

export default class CommonResponse<T> {
  private constructor(payload: {
    readonly data?: T
    readonly statusCode: number
    readonly message: string
  }) {
    this.data = payload?.data
    this.statusCode = payload.statusCode
    this.message = payload.message
  }

  private readonly data?: T

  private readonly statusCode: number

  private readonly message: string

  static of<T>(payload: {
    readonly data?: T
    readonly statusCode?: number
    readonly message?: string
  }): CommonResponse<T> {
    if (payload.data) {
      return new CommonResponse<T>({
        data: payload.data ?? null,
        statusCode: payload.statusCode ?? 200,
        message: payload.message ?? '',
      })
    }

    return new CommonResponse<T>({
      statusCode: payload.statusCode ?? 200,
      message: payload.message ?? '',
    })
  }
}
