import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ServerAuthService } from './server-auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto, UserProfileDto } from './dto/auth.dto';
import { AuthGuard } from './auth/guard/auth.guard';

const PATH = 'auth';
@ApiTags(PATH)
@Controller(PATH)
export class ServerAuthController {
  constructor(private authService: ServerAuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')  
  getProfile(@Request() req: any) {   
    return req.user;
  }
}
