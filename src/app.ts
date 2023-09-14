import 'reflect-metadata'

// ** Module Imports
import express from 'express'
import { Container } from 'typedi'
import { useExpressServer, useContainer } from 'routing-controllers'

// ** Util Imports
import { routingControllerOptions } from './utils/routingConfig'
import { useSwagger } from './utils/swagger'
import morgan from 'morgan'
import { logger, stream } from './utils/logger'
import cors from 'cors'

// ** DB Imports
import dataSource from './config/database'
import redis, { RedisClientOptions } from 'redis'

// ** Middleware Imports
import SecurityMiddleware from './middleware/SecurityMiddleware'
import { HttpErrorHandler } from 'middleware/ErrorMiddleware'
import LoggerMiddleware from 'middleware/LoggerMiddleware'

// ** Env Imports
import { REDIS_HOST, REDIS_PORT } from 'config'

export class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.setDatabase()
    this.setMiddlewares()
    this.setErrorHandler()
    // this.setRedis()
  }

  /**
   * 미들웨어를 세팅한다.
   */
  private setMiddlewares(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())
    this.app.use(morgan('combined', { stream }))
  }

  /**
   * 데이터베이스를 세팅한다.
   */
  private async setDatabase(): Promise<void> {
    try {
      await dataSource.initialize()
    } catch (error) {
      logger.error(error)
    }
  }

  /**
   * 컨테이너를 등록합니다.
   */
  private setErrorHandler(): void {
    Container.set(HttpErrorHandler, new HttpErrorHandler())
    Container.set(SecurityMiddleware, new SecurityMiddleware())
    Container.set(LoggerMiddleware, new LoggerMiddleware())
  }

  private setRedis(): void {
    const client = redis.createClient({
      host: REDIS_HOST,
      port: +REDIS_PORT,
    } as RedisClientOptions)

    client.on('connect', () => {
      logger.info('Redis is Running')
    })
  }

  /**
   * Express를 시작한다.
   * @param port 포트
   */
  public async createExpressServer(port: number): Promise<void> {
    try {
      useContainer(Container)
      useExpressServer(this.app, routingControllerOptions)
      useSwagger(this.app)
      this.app.listen(port, '0.0.0.0', () => {
        logger.info(`Server is running on PORT : ${port}`)
      })
    } catch (error) {
      logger.error(error)
    }
  }
}
