import { App } from './app'
import { SERVER_PORT } from './config'
import { logger } from './utils/logger'

try {
  const app = new App()
  const port: number = +SERVER_PORT

  app.createExpressServer(port)
} catch (error) {
  logger.error(error)
}
