import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ServerFeaturePostService } from './server-feature-post.service';
import { Action, IPost } from '@fst/shared/domain';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import {
  AppAbility,
  CheckPolicies,
  forActionOn,
  PoliciesGuard,
  ReadPolicyHandler,
  UpdatePolicyHandler
} from '@fst/server/casl';
import { CreatePostDto, PostDto, UpdatePostDto } from '@fst/server/shared';

const PATH = 'posts';

@ApiTags(PATH)
@ApiExtraModels(CreatePostDto, UpdatePostDto)
@Controller({ path: PATH })
@UseGuards(PoliciesGuard)
export class ServerFeaturePostController {
  constructor(private serverFeaturePostService: ServerFeaturePostService) {
  }

  @ApiOkResponse({
    type: PostDto,
    isArray: true,
    description: 'returns a list of posts'
  })
  @Get('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new ReadPolicyHandler(PostDto))
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new ReadPolicyHandler(PostDto))
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies(forActionOn(Action.Create, PostDto))
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new UpdatePolicyHandler(PostDto))
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, PostDto))
  delete(@Param('id') id: string): IPost {
    return this.serverFeaturePostService.delete(id);
  }
}
