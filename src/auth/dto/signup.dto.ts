import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

import { AuthDto } from './auth.dto';
import { Match } from '../decorator';

const PASSWORD_MIN_LOWER_CASE = 2;
const PASSWORD_MIN_UPPER_CASE = 2;
const PASSWORD_MIN_SYMBOLS = 2;
const PASSWORD_MIN_NUMBERS = 2;
const PASSWORD_MIN_LENGTH =
  PASSWORD_MIN_LOWER_CASE +
  PASSWORD_MIN_UPPER_CASE +
  PASSWORD_MIN_SYMBOLS +
  PASSWORD_MIN_NUMBERS;

export class SignupDto extends AuthDto {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'user desired password',
    required: true,
    minLength: PASSWORD_MIN_LENGTH,
    examples: ['#PaSsWoRd1234!', '5Up3rS3cR37#p455w0rd'],
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: PASSWORD_MIN_LENGTH,
    minLowercase: PASSWORD_MIN_LOWER_CASE,
    minUppercase: PASSWORD_MIN_UPPER_CASE,
    minSymbols: PASSWORD_MIN_SYMBOLS,
    minNumbers: PASSWORD_MIN_NUMBERS,
  })
  password: string;

  @ApiProperty({
    description: 'password confirmation (has to match the given password)',
    required: true,
  })
  @IsString()
  @Match(SignupDto, (s) => s.password, { message: 'Passwords have to match!' })
  passwordConfirm: string;
}
