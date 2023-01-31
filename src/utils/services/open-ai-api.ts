import { Configuration, OpenAIApi } from 'openai'

type CreateOpenAIApi = () => OpenAIApi

const createOpenAIApi: CreateOpenAIApi = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

  return new OpenAIApi(configuration)
}

export default createOpenAIApi