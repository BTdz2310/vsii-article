import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { ArticleModule } from './article/article.module';
import { TagModule } from './tag/tag.module';
import { CommonService } from './common/common.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.trategy';

@Module({
  imports: [
    KafkaModule,
    ArticleModule,
    TagModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [],
  providers: [CommonService, JwtStrategy],
})
export class AppModule {}
