import type { Middleware } from 'koa'

const handleHello: Middleware = async (ctx, next): Promise<void> => {
  ctx.status = 200
  ctx.body = {
    message: 'Hello!',
  }

  return next()
}

export default handleHello
