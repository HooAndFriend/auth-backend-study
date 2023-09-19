import { Request, Response, NextFunction } from 'express'
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from 'routing-controllers'
import { logger } from 'utils/logger'

/**
 * Error를 처리하는 미들웨어
 */
@Middleware({ type: 'after' })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  async error(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    logger.error(error)
    if (error instanceof HttpError) {
      const { method, originalUrl } = request
      const errorMessage = error.message || 'Internal Server Error'

      logger.error('===== ERROR =====')
      logger.error(`${method} : ${originalUrl}`)

      if (request.body) {
        logger.error(`Request Body : ${JSON.stringify(request.body)}`)
      }

      if (request.query) {
        logger.error(`Request Query : ${JSON.stringify(request.query)}`)
      }

      logger.error(`[${error.httpCode}] ${errorMessage}`)
      response.status(error.httpCode).json(error)

      return
    }

    next(error)
  }
}
