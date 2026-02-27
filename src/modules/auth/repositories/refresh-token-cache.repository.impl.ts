import { Injectable } from "@nestjs/common";
import { RedisService } from "../../redis/redis.service";
import { RefreshToken } from "../domain/RefreshToken";
import { IRefreshTokenCacheRepository } from "../domain/repositories/refresh-token-cache.repository";
import type { RefreshTokenSnapshot } from "../domain/RefreshToken";

@Injectable()
export class RefreshTokenCacheRepository implements IRefreshTokenCacheRepository {
  private static readonly KEY_PREFIX = "refresh_token:";

  constructor(private readonly redis: RedisService) {}

  async save(refreshToken: RefreshToken): Promise<void> {
    const key = RefreshTokenCacheRepository.key(refreshToken.id);
    const snapshot = refreshToken.toSnapshot();
    const ttlSeconds = Math.max(
      1,
      Math.floor((refreshToken.expiresAt.getTime() - Date.now()) / 1000)
    );
    await this.redis.client.setex(
      key,
      ttlSeconds,
      JSON.stringify(snapshot)
    );
  }

  async findByJti(jti: string): Promise<RefreshToken | null> {
    const data = await this.redis.client.get(
      RefreshTokenCacheRepository.key(jti)
    );
    if (!data) return null;
    const snapshot = JSON.parse(data) as RefreshTokenSnapshot;
    return RefreshToken.fromSnapshot(snapshot);
  }

  async delete(jti: string): Promise<void> {
    await this.redis.client.del(RefreshTokenCacheRepository.key(jti));
  }

  private static key(jti: string): string {
    return `${RefreshTokenCacheRepository.KEY_PREFIX}${jti}`;
  }
}
