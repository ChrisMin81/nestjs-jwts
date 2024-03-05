import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ServerFeaturePostService } from './server-feature-post.service';
import { IPost } from '@fst/shared/domain';
import { CreatePostDto } from './dto/post.dto';

@Controller({ path: 'posts' })
export class ServerFeaturePostController {
  constructor(private serverFeaturePostService: ServerFeaturePostService) {
  }

  @Get('')
  getAll(): IPost[] {
    return this.serverFeaturePostService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): IPost {
    return this.serverFeaturePostService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreatePostDto): IPost {
    return this.serverFeaturePostService.create(data);
  }
}
