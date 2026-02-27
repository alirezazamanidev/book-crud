import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../user/domain/User";
import { RefreshToken } from "../domain/RefreshToken";
import { REFRESH_TOKEN_CACHE_REPOSITORY } from "../auth.constants";
import type { IRefreshTokenCacheRepository } from "../domain/repositories/refresh-token-cache.repository";

const ACCESS_TTL = "15m";
const REFRESH_TTL_DAYS = 7;

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    @Inject(REFRESH_TOKEN_CACHE_REPOSITORY)
    private readonly refreshTokenCache: IRefreshTokenCacheRepository
  ) {}

  async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
    const refreshTokenAggregate = RefreshToken.create({
      userId: user.id,
      expiresAt,
    });

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.sign(
        { id: user.id, username: user.userName },
        { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: ACCESS_TTL }
      ),
      this.jwt.sign(
        { sub: user.id, jti: refreshTokenAggregate.id },
        { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: "7d" }
      ),
    ]);

    await this.refreshTokenCache.save(refreshTokenAggregate);

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string) {
    try {
      return this.jwt.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
    } catch {
      throw new UnauthorizedException("Invalid or expired access token");
    }
  }

  async verifyRefreshToken(token: string) {
    try {
      return this.jwt.verify(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
  }

  async validateRefreshTokenAndGetJti(refreshToken: string): Promise<string> {
    const payload = await this.verifyRefreshToken(refreshToken);
    const jti = payload.jti as string;
    if (!jti) throw new UnauthorizedException("Invalid refresh token payload");

    const stored = await this.refreshTokenCache.findByJti(jti);
    if (!stored) throw new UnauthorizedException("Refresh token not found or expired");

    if (!stored.isValid) {
      await this.refreshTokenCache.delete(jti);
      throw new UnauthorizedException("Refresh token is revoked or expired");
    }

    return jti;
  }

  
  async revokeRefreshToken(jti: string): Promise<void> {
    await this.refreshTokenCache.delete(jti);
  }
}
