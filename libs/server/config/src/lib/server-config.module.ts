import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServerConfigService } from './server-config.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  exports: [ServerConfigService],
  providers: [ServerConfigService],
})
export class ServerConfigModule {}
