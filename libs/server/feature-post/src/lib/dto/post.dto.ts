import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IPost, IUpdatePost, IUpsertPost } from '@fst/shared/domain';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreatePostDto implements Pick<IPost, 'title' | 'description'> {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class UpsertPostDto implements IUpsertPost {
  
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsBoolean()
  completed!: boolean;

  @IsString()
  @IsNotEmpty()
  description!: string;


  @IsString()
  @IsNotEmpty()
  title!: string;
  //
}

export class UpdatePostDto implements IUpdatePost {
  //
}
