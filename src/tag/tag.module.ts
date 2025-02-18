import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [TagController],
  providers: [TagService, PrismaService, CommonService],
})
export class TagModule {}
