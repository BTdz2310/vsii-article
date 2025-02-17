import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTagDto } from './dto/create-tag.dto';
import { AuthPayloadRegisterDto } from './dto/payload-message.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  create(tag: CreateTagDto) {
    return this.prisma.tag.create({
      data: tag,
    });
  }

  findAll() {
    return this.prisma.tag.findMany();
  }

  findOne(id: string) {
    return this.prisma.tag.findUnique({ where: { id } });
  }

  // update(id: number, updateTagDto: UpdateTagDto) {
  //   return `This action updates a #${id} tag`;
  // }

  remove(id: string) {
    return this.prisma.tag.delete({ where: { id } });
  }

  register(data: AuthPayloadRegisterDto) {
    return this.prisma.interestTags.createMany({
      data: data.tags.map((tag) => {
        return {
          tagId: tag,
          authId: data.authId,
        };
      }),
    });
  }
}
