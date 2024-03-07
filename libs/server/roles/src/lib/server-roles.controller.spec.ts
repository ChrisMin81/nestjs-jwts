import { Test } from '@nestjs/testing';
import { ServerRolesController } from './server-roles.controller';
import { ServerRolesService } from './server-roles.service';

describe('ServerRolesController', () => {
  let controller: ServerRolesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerRolesService],
      controllers: [ServerRolesController],
    }).compile();

    controller = module.get(ServerRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
