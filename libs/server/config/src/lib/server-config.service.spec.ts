import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

describe('ServerConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule]
    }).compile();

    service = module.get(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
  it('should return DATABASE_URL', () => {
    const db = service.get('DATABASE_URL');
    expect(db).toBeTruthy();
  });
});
