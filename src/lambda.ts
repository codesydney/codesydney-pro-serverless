import { configure as serverlessExpress } from '@vendia/serverless-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

let cachedServer

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule)

    // Enable CORS
    nestApp.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    })

    await nestApp.init()
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    })
  }
  return cachedServer(event, context)
}
