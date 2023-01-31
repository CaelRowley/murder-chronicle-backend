// Utils
import dotenv from 'dotenv'
import logger from 'utils/services/logger'
import createOpenAIApi from 'utils/services/open-ai-api'

// Server
import startServer from 'start-server'

dotenv.config()

// Services we will add to the koa context
const services = {
  logger,
  openAIApi: createOpenAIApi(),
}

const port: number = 1337

// Start the server
startServer(port, services).catch((error) => {
  logger.error(error)
})
