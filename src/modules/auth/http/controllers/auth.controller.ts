import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignInDto, SignUpDto } from "../dtos/auth.dto";
import { AuthService } from "../../services/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
  @Post('signup')
  signUp(@Body() dto:SignUpDto){
    return this.authService.signUp(dto);
  }
}
