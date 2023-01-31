import Router from 'koa-router'

// Routers
import handlePrompt from './prompt'

const router = new Router()

router.post('/prompt', handlePrompt)

export default router
