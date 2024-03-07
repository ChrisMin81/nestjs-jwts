import { Module } from '@nestjs/common';
import { ServerRolesController } from './server-roles.controller';
import { ServerRolesService } from './server-roles.service';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';

@Module({
  imports: [
    AccessControlModule.forRootAsync({
      imports: [ServerRolesModule],
      inject: [ServerRolesService],
      useFactory: async (
        roleService: ServerRolesService
      ): Promise<RolesBuilder> => {
        return await roleService.getRolesBuilderForAllRoles();
      },
    }),
  ],
  controllers: [ServerRolesController],
  providers: [ServerRolesService],
  exports: [ServerRolesService],
})
export class ServerRolesModule {}
