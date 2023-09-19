import { Request, Response, NextFunction } from 'express'
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { logger } from 'utils/logger'

/**
 * Request Logger Middleware
 */
@Middleware({ type: 'before' })
export default class LoggerMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl } = request
    logger.info(`[URL] ${method} : ${originalUrl}`)
    if (request.body) {
      logger.info(`Request Body : ${JSON.stringify(request.body)}`)
    }

    if (request.query) {
      logger.info(`Request Query : ${JSON.stringify(request.query)}`)
    }

    next()
  }
}
