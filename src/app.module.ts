import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { ArticleModule } from './article/article.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [KafkaModule, ArticleModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
