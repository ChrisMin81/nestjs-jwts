import { Module } from '@nestjs/common';
import { ServerAuthController } from './server-auth.controller';
import { ServerAuthService } from './server-auth.service';
import { ServerUsersModule } from '@fst/server/users';
import { JwtModule } from '@nestjs/jwt';
import { ServerConfigModule, ServerConfigService } from '@fst/server/config';

@Module({
  imports: [
    ServerUsersModule,
    ServerConfigModule,
    JwtModule.registerAsync({
      imports: [ServerConfigModule],
      useFactory: (configService: ServerConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ServerConfigService],
    }),
  ],
  controllers: [ServerAuthController],
  providers: [ServerAuthService],
  exports: [ServerAuthService],
})
export class ServerAuthModule {}
