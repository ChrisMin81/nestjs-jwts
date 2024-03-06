import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerFeaturePostModule } from '@fst/server/feature-post';
import { AuthGuard, ServerAuthModule } from '@fst/server/auth';
import { ServerConfigModule, ServerConfigService } from '@fst/server/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ServerUsersModule } from '@fst/server/users';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ServerConfigModule],
      useFactory: (configService: ServerConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')
      }),
      inject: [ServerConfigService],
    }),
    ServerFeaturePostModule, ServerAuthModule, ServerConfigModule, ServerUsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule { }
