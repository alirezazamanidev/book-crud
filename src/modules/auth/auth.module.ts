import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { UserModule } from "../user/user.module";
import { AuthController } from "./http/controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { TokenService } from "./services/token.service";

@Module({
  providers: [AuthService, TokenService],
  controllers: [AuthController],
  imports: [UserModule, JwtModule.register({
    global: true
  })],
  exports: [AuthService],
})
export class AuthModule { }
