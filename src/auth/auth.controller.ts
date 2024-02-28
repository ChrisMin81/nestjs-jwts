import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';
import { Tokens } from './types';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';

@Controller('auth')
@ApiExtraModels(Tokens, SignupDto)
@ApiTags('authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    required: true,
    schema: {
      $ref: getSchemaPath(SignupDto),
      example: {
        email: 'rand_user_' + new Date().getTime() + '@test.com',
        password: '#PaSsWoRd1234!',
        passwordConfirm: '#PaSsWoRd1234!',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    schema: {
      $ref: getSchemaPath(Tokens),
    },
  })
  @ApiBadRequestResponse({
    description: 'if credentials are invalid',
    schema: {
      example: {
        message: 'email must be an email',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'if credentials are invalid',
    schema: {
      example: {
        message: 'Credentials incorrect',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: SignupDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @ApiBadRequestResponse({
    description: 'if provided credentials are invalid',
    schema: {
      example: {
        message: ['email must be an email'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiOkResponse({
    description: 'logged in successfully',
    schema: {
      $ref: getSchemaPath(Tokens),
    },
  })
  @ApiForbiddenResponse({
    description: 'if credentials are invalid',
    schema: {
      example: {
        message: 'Access Denied',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @ApiOkResponse({
    description: 'logged out successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'if token is invalid logged out',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @ApiUnauthorizedResponse({
    description: 'if refresh token is invalid or already logged out',
  })
  @ApiOkResponse({
    description: 'refreshed in successfully',
    schema: {
      $ref: getSchemaPath(Tokens),
    },
  })
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
