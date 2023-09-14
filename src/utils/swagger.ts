import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { getMetadataArgsStorage } from 'routing-controllers'
import { getFromContainer, MetadataStorage } from 'class-validator'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { routingControllerOptions } from './routingConfig'
import { SWAGGER_ROUTE } from '../config'

/**
 * Swagger를 사용하도록 한다.
 * @param app Express Application
 */
export function useSwagger(app: express.Application) {
  const metadatas = (getFromContainer(MetadataStorage) as any)
    .validationMetadatas
  const schemas: any = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas',
  })

  const storage = getMetadataArgsStorage()
  const spec = routingControllersToSpec(storage, routingControllerOptions, {
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    info: {
      title: 'Kido Sport Backend API',
      description: 'Kido Sport API',
      version: '1.0.0',
    },
  })

  app.use(SWAGGER_ROUTE, swaggerUi.serve, swaggerUi.setup(spec))
}
