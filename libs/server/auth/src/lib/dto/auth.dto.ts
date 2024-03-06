import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IPost, IProfileDto, IUpdatePost, IUpdateUser, IUser } from '@fst/shared/domain';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto implements Pick<IUser, 'email' | 'password'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class UserProfileDto implements IProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username!: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()  
  email!: string;
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
