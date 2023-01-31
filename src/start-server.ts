import type Logger from 'bunyan'

// Koa
import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import koaCompress from 'koa-compress'
import koaCors from '@koa/cors'
import koaJsonError from 'koa-json-error'
import koaLogger, { timeContext, requestIdContext } from 'koa-bunyan-logger'

// Middlewares
import router from 'routes'
import attachServices from 'middlewares/services/attach-services'
import { OpenAIApi } from 'openai'

const startServer = async (
  port: number,
  services: { logger: Logger, openAIApi: OpenAIApi }
): Promise<Koa<Koa.DefaultState, Koa.DefaultContext>> => {
  const { logger, openAIApi } = services

  // Set up Koa Application
  const app = new Koa()

  /*
   * Set up error handler.
   * JSON representation of errors are sent to the client to allow easier parsing and improve consistency.
   * NOTE: As the stack trace might leak sensitive information, we remove this trace in non-dev timeContext.
   */
  app.use(
    koaJsonError({
      postFormat: (_error, object) =>
        // remove stack trace in non-dev environments
       object
    })
  )

  /**
   * Set up compress middleware
   * https://github.com/koajs/compress
   */
  app.use(koaCompress())

  /*
   * Set up body parser middleware.
   * Supports 'json', 'form' and 'text' body types.
   * NOTE: this module doesn't support parsing multipart format data, please use `co-busboy` to parse multipart form data.
   * https://github.com/koajs/bodyparser
   */
  app.use(koaBodyParser())

  /*
   * Set up logger middleware.
   * Available as 'ctx.log'
   * https://github.com/koajs/bunyan-logger
   */
  app.use(koaLogger(logger))
  app.use(
    requestIdContext({
      // reads the specified header or creates a uuid
      header: 'X-Request-Id',
      // how this value is logged
      field: 'X-Request-Id',
      // property name in koa's `request`
      requestProp: 'request-id',
    })
  )

  /*
   * Set up timing ability.
   * Available as `ctx.time(label)` and `ctx.timeEnd(label)` which
   * records the time between the time() and timeEnd() calls for a given label.
   * https://github.com/koajs/bunyan-logger#koabunyanloggertimecontextopts
   */
  app.use(
    timeContext({
      logLevel: 'debug',
    })
  )

  /*
   * Set up CORS.
   * https://github.com/koajs/cors
   */
  app.use(koaCors())

  /*
   * Attach our own services (e.g. logger, axios, etc.) that should be globally available in downstream middleware.
   */
  app.use(attachServices(logger, openAIApi))


  /*
   * Set up router middleware.
   * https://github.com/ZijianHe/koa-router#module_koa-router--Router+routes
   */
  app.use(router.routes())

  /*
   * Set up router middleware for OPTIONS requests.
   * https://github.com/ZijianHe/koa-router#module_koa-router--Router+allowedMethods
   */
  app.use(router.allowedMethods())

  // Start the server
  await new Promise((resolve) => app.listen({ port }, () => resolve(null)))

  logger.info(
    `👂 Server be jammin on http://localhost:${port}`
  )

  return app
}

export default startServer
