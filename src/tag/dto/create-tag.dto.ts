import { IsUrl, IsUUID } from '@nestjs/class-validator';

export class CreateTagDto {
  name: string;

  @IsUrl()
  imageUrl: string;

  @IsUUID()
  categoryId: string;
}
