import { AppRole, IPost, IUser } from '@fst/shared/domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto implements IUser {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  roles: AppRole[] = [];

  @ApiProperty()
  @IsArray()
  posts: IPost[] = [];
}
