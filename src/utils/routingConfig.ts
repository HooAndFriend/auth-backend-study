export const routingControllerOptions = {
  cors: true,
  routePrefix: '/api',
  controllers: [`${__dirname}/../controller/*{.ts,.js}`],
  middlewares: [`${__dirname}/../middleware/*{.ts,.js}`],
  defaultErrorHandler: false,
}
