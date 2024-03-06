import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IPost, IUpdatePost, IUpsertPost } from '@fst/shared/domain';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto implements IPost {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;
}


/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreatePostDto implements Pick<IPost, 'title' | 'description'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class UpdatePostDto implements IUpdatePost {

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;
}
