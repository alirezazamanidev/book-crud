import { Global, Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { UserModule } from "../user/user.module";
import { AuthController } from "./http/controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { TokenService } from "./services/token.service";
import { REFRESH_TOKEN_CACHE_REPOSITORY } from "./auth.constants";
import { RefreshTokenCacheRepository } from "./repositories/refresh-token-cache.repository.impl";
import { RedisModule } from "../redis/redis.module";

@Global()
@Module({
  imports: [
    UserModule,
    RedisModule,
    JwtModule.register({ global: true }),
  ],
  providers: [
    AuthService,
    TokenService,
    {
      provide: REFRESH_TOKEN_CACHE_REPOSITORY,
      useClass: RefreshTokenCacheRepository,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
