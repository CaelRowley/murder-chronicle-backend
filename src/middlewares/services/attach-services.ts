import type { Middleware } from 'koa'
import type Logger from 'bunyan'
import { OpenAIApi } from 'openai'

export type Services = {
  logger: Logger,
  openAIApi: OpenAIApi,
}

type AttachServices = (logger: Logger, openAIApi: OpenAIApi) => Middleware
const attachServices: AttachServices =
  (logger, openAIApi) => async (ctx, next) => {
    const services: Services = {
      logger,
      openAIApi,
    }

    ctx.state = {
      ...ctx.state,
      services,
    }

    return next()
  }

export default attachServices
