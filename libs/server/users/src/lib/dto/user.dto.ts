import { IPost, IUser } from '@fst/shared/domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
    @IsBoolean()
    isAdmin = false;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    posts: IPost[] = [];
}
