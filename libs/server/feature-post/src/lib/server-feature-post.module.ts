import { Module } from '@nestjs/common';
import { ServerFeaturePostController } from './server-feature-post.controller';
import { ServerFeaturePostService } from './server-feature-post.service';
import { PostDto } from '@fst/server/shared';
import { ServerRolesModule } from '@fst/server/roles';

@Module({
  imports: [PostDto, ServerRolesModule],
  controllers: [ServerFeaturePostController],
  providers: [ServerFeaturePostService],
  exports: [ServerFeaturePostService, PostDto],
})
export class ServerFeaturePostModule {}
