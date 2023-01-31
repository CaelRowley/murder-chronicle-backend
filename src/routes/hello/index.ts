import Router from 'koa-router'

// Routers
import handleHello from './handle-hello'

const hello = new Router()

hello.get('/', handleHello)

export default hello
