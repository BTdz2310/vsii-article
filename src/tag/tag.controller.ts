import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthPayloadRegisterDto } from './dto/payload-message.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll() {
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
