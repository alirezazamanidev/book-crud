import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignInDto } from "../dtos/auth.dto";
import { AuthService } from "../../services/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
