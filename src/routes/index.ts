import Router from 'koa-router'
import hello from 'routes/hello'
import openai from 'routes/openai'

const router = new Router()
router.use('/hello', hello.routes())
router.use('/openai', openai.routes())

export default router
