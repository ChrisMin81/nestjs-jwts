import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ServerFeaturePostService } from './server-feature-post.service';
import { Action, IAdminUser, IPost } from '@fst/shared/domain';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { CreatePostDto, PostDto, UpdatePostDto, User } from '@fst/server/shared';
import { ACGuard, UseRoles } from 'nest-access-control';

const PATH = 'posts';

@ApiTags(PATH)
@ApiExtraModels(CreatePostDto, UpdatePostDto)
@Controller({ path: PATH })
@UseGuards(ACGuard)
export class ServerFeaturePostController {
  constructor(private serverFeaturePostService: ServerFeaturePostService) {
  }

  @ApiOkResponse({
    type: PostDto,
    isArray: true,
    description: 'returns a list of posts'
  })
  @Get('')
  @UseGuards(ACGuard)
  @UseRoles({
    resource: PATH,
    action: Action.Read,
    possession: 'own'
  })
  getAll(@User() user: IAdminUser): IPost[] {
    return this.serverFeaturePostService.getAll(user);
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
  @UseGuards(ACGuard)
  @UseRoles({
    resource: PATH,
    action: Action.Read,
    possession: 'any'
  })
  getOne(@Param('id') id: string, @User() user: IAdminUser): IPost | null {
    return this.serverFeaturePostService.getOne(id, user);
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
  @UseGuards(ACGuard)
  @UseRoles({
    resource: PATH,
    action: Action.Create,
    possession: 'own'
  })
  create(@Body() data: CreatePostDto, @User('userId') userId: string): IPost {
    return this.serverFeaturePostService.create(data, userId);
  }

  @ApiOkResponse({
    type: PostDto,
    isArray: false,
    description: 'updates a post'
  })
  @ApiNotFoundResponse({
    description: 'if the id was not found'
  })
  @UseRoles({
    resource: PATH,
    action: Action.Update,
    possession: 'own'
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
    @User() user: IAdminUser
  ): IPost {
    return this.serverFeaturePostService.update(id, data, user);
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
  @UseRoles({
    resource: PATH,
    action: Action.Delete,
    possession: 'own'
  })
  delete(@Param('id') id: string, @User() user: IAdminUser): IPost {
    return this.serverFeaturePostService.delete(id, user);
  }
}
