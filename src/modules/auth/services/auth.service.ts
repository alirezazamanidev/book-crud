import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { USER_REPOSITORY } from "../../user/user.constants";
import type { IUserRepository } from "../../user/domain/repositories/user.repository.port";
import { SignInDto } from "../http/dtos/auth.dto";
import { compare } from "bcrypt";
import { TokenService } from "./token.service";

@Injectable()
export class AuthService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository, private readonly tokenService: TokenService) { }


  async signIn(dto: SignInDto) {

    let user = await this.userRepository.findByUsername(dto.username);

    if (!user || !(await compare(dto.password, user.hashPassword))) throw new UnauthorizedException('Invalid credentials');


    return {
      message:'login successfully',
      token:{
        type:'bearer header',
        value:await this.tokenService.generateToken(user),
        expiresIn:'7d'
      }
    }
  }
}
