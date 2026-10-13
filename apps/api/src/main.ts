import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { toNodeHandler } from 'better-auth/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  const expressApp = app.getHttpAdapter().getInstance();
  const authService = app.get<AuthService>(AuthService);

  expressApp.all(
    /^\/api\/auth\/.*/, toNodeHandler(authService.instance.handler),
  );

  expressApp.use(require('express').json());
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
