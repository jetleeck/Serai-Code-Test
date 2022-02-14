import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = app.get(ConfigService);
  const port = process.env.PORT;
  await app.listen(port, () => {
    // Logger.log('Listening at http://localhost:' + port);
    Logger.log('App starts');
  });
}
bootstrap();
