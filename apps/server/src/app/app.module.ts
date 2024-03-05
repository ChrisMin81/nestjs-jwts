import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerFeaturePostModule } from '@fst/server/feature-post';

@Module({
  imports: [ServerFeaturePostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
