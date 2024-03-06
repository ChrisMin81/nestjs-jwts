import { Module } from '@nestjs/common';
import { ServerUsersController } from './server-users.controller';
import { ServerUsersService } from './server-users.service';

@Module({
  controllers: [ServerUsersController],
  providers: [ServerUsersService],
  exports: [ServerUsersService],
})
export class ServerUsersModule {}
