import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Role } from 'enums/roles.enum';
import { Status } from 'enums/status.enum';
import { IUser } from 'interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import dayjs from 'dayjs';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createArticleDto: CreateArticleDto,
    // createArticleDto: Omit<
    //   Prisma.ArticleCreateInput,
    //   'category' | 'authorName' | 'authorAvatar'
    // >,
    user: IUser,
  ) {
    try {
      console.log(user)
      const isFromCommunity = user.role.includes(Role.USER);
      console.log(isFromCommunity)
      let status = Status.DRAFT;
      let publishedAt = {};
      if (isFromCommunity && createArticleDto.status === Status.PENDING)
        status = Status.PENDING;
      else if (
        !isFromCommunity &&
        (createArticleDto.status === Status.PENDING ||
          createArticleDto.status === Status.REJECTED)
      )
        status = Status.DRAFT;
      // else if (!isFromCommunity && createArticleDto.status === Status.PUBLISHED)
      //   publishedAt = {
      //     publishedAt: dayjs().toISOString(),
      //   };
      const article = await this.prisma.article.create({
        data: {
          ...createArticleDto,
          status,
          isFromCommunity,
          authorId: user.id,
          authorName: user.username,
          authorAvatar: user.avatar,
          categoryId: createArticleDto.categoryId,
          ...publishedAt,
          tags: {
            create: createArticleDto.tags.map((tagId) => ({
              tag: {
                connect: { id: tagId },
              },
            })),
          },
        },
      });
      return article;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(e.message);
        }
      }
      throw e;
    }
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
