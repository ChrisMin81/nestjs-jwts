import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

const PATH = 'users';
@ApiTags(PATH)
@Controller({ path: PATH })
export class ServerUsersController {}
