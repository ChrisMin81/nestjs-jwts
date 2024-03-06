import { Module } from '@nestjs/common';
import { ServerCaslAbilityFactory } from './server-casl.service';

@Module({
  providers: [ServerCaslAbilityFactory],
  exports: [ServerCaslAbilityFactory,],
})
export class ServerCaslModule {}
