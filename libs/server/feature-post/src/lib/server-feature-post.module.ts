import { Module } from '@nestjs/common';
import { ServerFeaturePostController } from './server-feature-post.controller';
import { ServerFeaturePostService } from './server-feature-post.service';
import { PostDto } from './dto/post.dto';
import { ServerCaslModule } from '@fst/server/casl';

@Module({
  imports: [PostDto, ServerCaslModule],
  controllers: [ServerFeaturePostController],
  providers: [ServerFeaturePostService],
  exports: [ServerFeaturePostService, PostDto],
})
export class ServerFeaturePostModule { }
