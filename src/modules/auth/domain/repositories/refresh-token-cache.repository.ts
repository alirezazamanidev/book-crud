import { RefreshToken } from "../RefreshToken";

export interface IRefreshTokenCacheRepository {
  save(refreshToken: RefreshToken): Promise<void>;
  findByJti(jti: string): Promise<RefreshToken | null>;
  delete(jti: string): Promise<void>;
}
