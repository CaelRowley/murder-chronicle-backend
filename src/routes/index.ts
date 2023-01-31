import Router from 'koa-router'
import hello from 'routes/hello'

const router = new Router()
router.use('/hello', hello.routes())

export default router
