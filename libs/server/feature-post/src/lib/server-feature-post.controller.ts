import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServerFeaturePostService } from './server-feature-post.service';
import { IPost } from '@fst/shared/domain';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { log } from 'console';

const PATH = 'posts';

@ApiTags(PATH)
@ApiExtraModels(CreatePostDto)
@Controller({ path: PATH })
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

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePostDto): IPost {
    return this.serverFeaturePostService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): IPost {
    return this.serverFeaturePostService.delete(id);
  }
}
