import { Controller } from '@nestjs/common';
import { ServerUsersService } from './server-users.service';
import { ApiTags } from '@nestjs/swagger';

const PATH = 'users';
@ApiTags(PATH)
@Controller({ path: PATH })
export class ServerUsersController {
  constructor(private serverUsersService: ServerUsersService) { }
}
