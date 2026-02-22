import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { Observable } from "rxjs";
import { TokenService } from "../../services/token.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly tokenService: TokenService) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
 
    request.user = this.tokenService.verify(token);
    return true;
  }
  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];

    if (type.toLocaleLowerCase() !== 'bearer' || !token || !isJWT(token)) throw new UnauthorizedException()
    return token;
  }
}
