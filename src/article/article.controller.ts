import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'decorators/roles.decorator';
import { Role } from 'enums/roles.enum';
import { User } from 'decorators/user.decorator';
import { IUser } from 'interfaces/user.interface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.WRITTER, Role.USER)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @User() user: IUser) {
    return this.articleService.create(createArticleDto, user);
  }

  @Get('/article/:id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }
}
