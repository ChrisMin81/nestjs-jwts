import { Controller } from '@nestjs/common';
import { ServerRolesService } from './server-roles.service';

@Controller('server-roles')
export class ServerRolesController {
  constructor(private serverRolesService: ServerRolesService) {}
}
