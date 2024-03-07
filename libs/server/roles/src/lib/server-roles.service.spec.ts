import { Test } from '@nestjs/testing';
import { ServerRolesService } from './server-roles.service';

describe('ServerRolesService', () => {
  let service: ServerRolesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerRolesService],
    }).compile();

    service = module.get(ServerRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
