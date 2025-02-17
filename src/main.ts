import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'article',
        brokers: [
          `${process.env.NODE_ENV === 'dev' ? 'localhost' : 'kafka'}:9092`,
          // 'localhost:9092',
        ],
      },
      consumer: {
        groupId: 'article-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
