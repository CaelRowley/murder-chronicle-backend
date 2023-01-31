import type { Middleware } from 'koa'

const handlePrompt: Middleware = async (ctx: any, next): Promise<void> => {
  const { logger, openAIApi } = ctx.state.services
  const { prompt } = ctx.request.body

  try {
    const completion = await openAIApi.createCompletion({
      model: "text-davinci-003",
      prompt,
    })

    ctx.status = 200
    ctx.body = {
      response: completion.data.choices[0].text,
    }
    
  } catch (error) {
    logger.error(error)
  }

  return next()
}

export default handlePrompt
