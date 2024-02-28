import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'user email',
    required: true,
    examples: ['user@test.com', 'user2@test.com'],
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'user password',
    required: true,
    examples: ['#PaSsWoRd1234!', '5Up3rS3cR37#p455w0rd'],
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
