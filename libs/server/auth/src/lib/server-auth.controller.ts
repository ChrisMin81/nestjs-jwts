import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { ServerAuthService } from './server-auth.service';
import { ApiTags } from '@nestjs/swagger';
import { IUser } from '@fst/shared/domain';
import { Public, SignInDto, SignupDto } from '@fst/server/shared';

const PATH = 'auth';

@ApiTags(PATH)
@Controller(PATH)
export class ServerAuthController {
  constructor(private authService: ServerAuthService) {
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  
  @Get('profile')
  getProfile(@Request() req: Partial<{ user: IUser | undefined }>) {
    return req.user;
  }
}
