import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as config from 'config';
// import { Logger } from '@nestjs/common';

async function bootstrap() {
  // const logger = new Logger('bootstrap');
  // const serverConfig = config.get('server');
  // const port = process.env.PORT || serverConfig.port;
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule);
  await app.listen(port || 4000);
  // logger.log(`Application listening in port: ${port}`);
}
bootstrap();
