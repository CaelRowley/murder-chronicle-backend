import type { Middleware } from 'koa'
import type Logger from 'bunyan'

export type Services = {
  logger: Logger
}

type AttachServices = (logger: Logger) => Middleware
const attachServices: AttachServices =
  (logger) => async (ctx, next) => {
    const services: Services = {
      logger,
    }

    ctx.state = {
      ...ctx.state,
      services,
    }

    return next()
  }

export default attachServices
