import Router from 'koa-router'

// Routers
import handleHello from './handle-hello'

const router = new Router()

router.get('/', handleHello)

export default router
