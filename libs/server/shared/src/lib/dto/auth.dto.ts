import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateUser, IUser } from '@fst/shared/domain';
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

export class SignupDto implements ICreateUser {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  passwordConfirmation!: string;

}
