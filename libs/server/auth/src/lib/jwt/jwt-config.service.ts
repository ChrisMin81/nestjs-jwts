import { ServerConfigService } from "@fst/server/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

export class JwtConfigService implements JwtOptionsFactory {
    constructor(private configService: ServerConfigService) { }
    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get('JWT_SECRET')
        };
    }
}