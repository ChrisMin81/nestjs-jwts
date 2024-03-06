import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ServerFeaturePostService } from './server-feature-post.service';
import { IPost } from '@fst/shared/domain';
import { CreatePostDto, PostDto, UpdatePostDto } from './dto/post.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiResponseProperty, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

const PATH = 'posts';

@ApiTags(PATH)
@ApiExtraModels(CreatePostDto, UpdatePostDto)
@Controller({ path: PATH })
export class ServerFeaturePostController {
  constructor(private serverFeaturePostService: ServerFeaturePostService) {
  }

  @ApiOkResponse({
    type: PostDto,
    isArray: true,
    description: 'returns a list of posts'
  })
  @Get('')
  getAll(): IPost[] {
    return this.serverFeaturePostService.getAll();
  }

  @ApiOkResponse({
    type: PostDto,
    isArray: false,
    description: 'returns a post'
  })
  @ApiNotFoundResponse({
    description: 'if the id was not found'
  })
  @Get(':id')
  getOne(@Param('id') id: string): IPost {
    return this.serverFeaturePostService.getOne(id);
  }

  @ApiCreatedResponse({
    type: PostDto,
    isArray: false,
    description: 'creates a post'    
  })
  @ApiBadRequestResponse({
    description: 'on validation errors'
  })
  @Post('')
  create(@Body() data: CreatePostDto): IPost {
    return this.serverFeaturePostService.create(data);
  }

  @ApiOkResponse({
    type: PostDto,
    isArray: false,
    description: 'updates a post'
  })
  @ApiNotFoundResponse({
    description: 'if the id was not found'
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePostDto): IPost {
    return this.serverFeaturePostService.update(id, data);
  }

  @ApiOkResponse({
    type: PostDto,
    isArray: false,
    description: 'deletes a post'
  })
  @ApiNotFoundResponse({
    description: 'if the id was not found'
  })
  @Delete(':id')
  delete(@Param('id') id: string): IPost {
    return this.serverFeaturePostService.delete(id);
  }
}
