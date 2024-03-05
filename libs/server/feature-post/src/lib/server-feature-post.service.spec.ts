import { Test } from '@nestjs/testing';
import { ServerFeaturePostService } from './server-feature-post.service';

describe('ServerFeaturePostService', () => {
  let service: ServerFeaturePostService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerFeaturePostService],
    }).compile();

    service = module.get(ServerFeaturePostService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
