import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { SignInDto, SignUpDto, RefreshTokenDto } from "../dtos/auth.dto";
import { AuthService } from "../../services/auth.service";
import { AuthGuard } from "../guards/auth.guard";
import type { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post("signup")
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    return this.authService.logout(req?.['user'].id);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  me(@Req() req: Request) {
    return req?.["user"];
  }
}
