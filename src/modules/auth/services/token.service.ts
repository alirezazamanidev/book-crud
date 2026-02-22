import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../user/domain/User";

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) { }

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      username: user.userName,

    }
    return this.jwt.sign(payload, {secret: process.env.JWT_SECRET, expiresIn:"7d"});
  }

  async verify(token:string){
    try {

      return this.jwt.verify(token,{secret:process.env.JWT_SECRET})
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
