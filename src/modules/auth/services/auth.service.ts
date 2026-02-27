import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { USER_REPOSITORY } from "../../user/user.constants";
import type { IUserRepository } from "../../user/domain/repositories/user.repository.port";
import { SignInDto, SignUpDto } from "../http/dtos/auth.dto";
import { compare, hashSync } from "bcrypt";
import { TokenService } from "./token.service";
import { User } from "../../user/domain/User";

export interface AuthTokensResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly tokenService: TokenService
  ) {}

  async signIn(dto: SignInDto): Promise<{ message: string; tokens: AuthTokensResponse }> {
    const user = await this.userRepository.findByUsername(dto.username);
    if (!user || !(await compare(dto.password, user.hashPassword))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    user.isVerify = true;
    await this.userRepository.save(user);

    const tokens = await this.tokenService.generateTokens(user);
    return {
      message: "Login successfully",
      tokens,
    };
  }

  async signUp(dto: SignUpDto): Promise<{ message: string; tokens: AuthTokensResponse }> {
    const existing = await this.userRepository.findByUsername(dto.username);
    if (existing) {
      throw new ConflictException("The username already exists");
    }

    const hashPassword = hashSync(dto.password, 10);
    const user = User.create({
      username: dto.username,
      fullName: dto.fullname,
      hashPassword,
    });
    user.isVerify = true;
    await this.userRepository.save(user);

    const tokens = await this.tokenService.generateTokens(user);
    return {
      message: "Sign up successfully",
      tokens,
    };
  }

  async refresh(refreshToken: string): Promise<AuthTokensResponse> {
    const jti = await this.tokenService.validateRefreshTokenAndGetJti(refreshToken);
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);
    const userId = payload.sub as string;
    if (!userId) throw new UnauthorizedException("Invalid refresh token payload");

    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedException("User not found");

    await this.tokenService.revokeRefreshToken(jti);

    const tokens = await this.tokenService.generateTokens(user);
    return { ...tokens };
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    
      const payload = await this.tokenService.verifyRefreshToken(refreshToken);
      const jti = payload.jti as string;
      if (jti) await this.tokenService.revokeRefreshToken(jti);

    return { message: "Logged out successfully" };
  }
}
