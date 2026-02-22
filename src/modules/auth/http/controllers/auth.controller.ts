import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { SignInDto, SignUpDto } from "../dtos/auth.dto";
import { AuthService } from "../../services/auth.service";
import { AuthGuard } from "../guards/auth.guard";
import type { Request } from "express";

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

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: Request) {
    return req?.['user'];
  }
}
