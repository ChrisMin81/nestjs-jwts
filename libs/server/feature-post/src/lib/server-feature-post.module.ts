import { Module } from '@nestjs/common';
import { ServerFeaturePostController } from './server-feature-post.controller';
import { ServerFeaturePostService } from './server-feature-post.service';

@Module({
  controllers: [ServerFeaturePostController],
  providers: [ServerFeaturePostService],
  exports: [ServerFeaturePostService],
})
export class ServerFeaturePostModule {}
