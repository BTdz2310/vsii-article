import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ARTICLE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'article',
            brokers: [
              `${process.env.NODE_ENV === 'dev' ? 'localhost' : 'kafka'}:9092`,
              // 'localhost:9092',
            ],
            retry: {
              retries: 1,
              multiplier: 1,
            },
          },
          consumer: {
            groupId: 'article-consumer',
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
