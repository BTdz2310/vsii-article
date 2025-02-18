import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthPayloadRegisterDto } from './dto/payload-message.dto';
import { CommonService } from 'src/common/common.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { User } from 'decorators/user.decorator';
import { IUser } from 'interfaces/user.interface';
import { Roles } from 'decorators/roles.decorator';
import { Role } from 'enums/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('tag')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly commonService: CommonService,
  ) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER, Role.WRITTER)
  @Get()
  findAll(@User() user: IUser) {
    const pub = this.commonService.getPublicKey();
    console.log(user);
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }

  @EventPattern('auth.register')
  register(@Payload() data: AuthPayloadRegisterDto) {
    console.log(data);
    return this.tagService.register(data);
  }
}
