import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Role } from 'enums/roles.enum';
import { Status } from 'enums/status.enum';
import { IUser } from 'interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import dayjs from 'dayjs';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly prisma: PrismaService,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    // createArticleDto: Omit<
    //   Prisma.ArticleCreateInput,
    //   'category' | 'authorName' | 'authorAvatar'
    // >,
    user: IUser,
  ) {
    try {
      console.log(user);
      const isFromCommunity = user.role.includes(Role.USER);
      const status = Status.PUBLISHED;
      // let publishedAt = {};
      // if (isFromCommunity && createArticleDto.status === Status.PENDING)
      //   status = Status.PENDING;
      // else if (
      //   !isFromCommunity &&
      //   createArticleDto.status === Status.PUBLISHED
      // ) {
      //   publishedAt = {
      //     publishedAt: dayjs().toISOString(),
      //   };
      // }
      const publishedAt = new Date();
      const article = await this.prisma.article.create({
        data: {
          ...createArticleDto,
          status,
          isFromCommunity,
          authorId: user.id,
          authorName: user.username,
          authorAvatar: user.avatar,
          categoryId: createArticleDto.categoryId,
          publishedAt,
          tags: {
            create: createArticleDto.tags.map((tagId) => ({
              tag: {
                connect: { id: tagId },
              },
            })),
          },
        },
      });
      // console.log(dayjs(publishedAt).format('YYYY-MM-DD HH:mm:ss:SSS'));
      const articleIndex = {
        id: article.id,
        title: article.title,
        content: article.content,
        description: article.description,
        publishedAt: new Date(publishedAt).getTime() / 1000,
        imageUrl: article.imageUrl,
        tags: createArticleDto.tags,
        authorName: article.authorName,
      };
      this.kafkaClient.emit('article.index', articleIndex);
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

  findOne(id: string) {
    return this.prisma.article.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
