import { Test } from '@nestjs/testing';
import { ServerFeaturePostController } from './server-feature-post.controller';
import { ServerFeaturePostService } from './server-feature-post.service';

describe('ServerFeaturePostController', () => {
  let controller: ServerFeaturePostController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerFeaturePostService],
      controllers: [ServerFeaturePostController],
    }).compile();

    controller = module.get(ServerFeaturePostController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
