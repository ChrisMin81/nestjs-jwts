import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerFeaturePostModule } from '@fst/server/feature-post';
import { ServerAuthModule } from '@fst/server/auth';
import { ConfigModule } from '@nestjs/config';
import { ServerConfigModule } from '@fst/server/config';

@Module({
  imports: [ServerFeaturePostModule, ServerAuthModule, ServerConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
