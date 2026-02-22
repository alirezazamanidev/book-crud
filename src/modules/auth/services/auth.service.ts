import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { USER_REPOSITORY } from "../../user/user.constants";
import type { IUserRepository } from "../../user/domain/repositories/user.repository.port";
import { SignInDto, SignUpDto } from "../http/dtos/auth.dto";
import { compare, hashSync } from "bcrypt";
import { TokenService } from "./token.service";
import { User } from "../../user/domain/User";

@Injectable()
export class AuthService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository, private readonly tokenService: TokenService) { }


  async signIn(dto: SignInDto) {

    let user = await this.userRepository.findByUsername(dto.username);

    if (!user || !(await compare(dto.password, user.hashPassword))) throw new UnauthorizedException('Invalid credentials');

    user.isVerify=true;
    await this.userRepository.save(user);


    return {
      message: 'login successfully',
      token: {
        type: 'bearer header',
        value: await this.tokenService.generateToken(user),
        expiresIn: '7d'
      }
    }
  }

  async signUp(dto: SignUpDto) {
    let user = await this.userRepository.findByUsername(dto.username);
    if (user) throw new ConflictException('The Username is already exists');
    const hashPassword = hashSync(dto.password, 10);
    user = User.create({
      username: dto.username,
      fullName: dto.fullname,
      hashPassword
    })
    user.isVerify=true
    await this.userRepository.save(user);

    return {
      message: 'signUp successFully',
      token:{
        type: 'bearer header',
        value: await this.tokenService.generateToken(user),
        expiresIn: '7d'

      }
    }
  }
}
