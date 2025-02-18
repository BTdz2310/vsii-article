import { Type } from '@nestjs/class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from '@nestjs/class-validator';
import { Status } from 'enums/status.enum';

export class CreateArticleDto {
  @IsString()
  @Length(10, 50, { message: 'Tiêu đề phải từ 10 đến 50 ký tự' })
  // @Matches(/^[a-zA-Z0-9\s]*$/, {
  //   message: 'Tiêu đề không được chứa ký tự đặc biệt',
  // })
  title: string;

  @IsString()
  @Length(10, 500, { message: 'Mô tả phải từ 10 đến 500 ký tự' })
  description: string;

  @IsString()
  @MinLength(10, { message: 'Nội dung phải tối thiểu 10 ký tự' })
  content: string;

  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  imageUrl: string;

  // @IsOptional()
  // @IsDate()
  // @Type(() => Date)
  // publishedAt: Date;

  status: Status;

  @IsArray()
  @IsUUID(undefined, { each: true })
  tags: string[];
}
