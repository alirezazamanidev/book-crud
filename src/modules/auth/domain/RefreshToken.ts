import { randomUUID } from "crypto";
import { AggregateRoot } from "../../../common/seed-works/domain/aggregateRoot";
export interface RefreshTokenProps {

  userId: string;
  token: string;
  expiresAt: Date;
}
export class RefreshToken extends AggregateRoot<string> {

  private  _userId: string
  private  _token: string
  private  _expiresAt: Date
  private  _isRevoked: boolean
  private constructor(props: RefreshTokenProps) {
    super();
    this.id = randomUUID().toString();
    this._userId = props.userId;
    this._token = props.token;
    this._expiresAt = props.expiresAt;
    this._isRevoked = false;
    this._createdAt = new Date();
  }


  static create(props: { userId: string, token: string, expiresAt: Date }): RefreshToken {
    return new RefreshToken({
      userId: props.userId,
      token: props.token,
      expiresAt: props.expiresAt,
    });
  }
  static reconstitute(props: RefreshTokenProps): RefreshToken {
    return new RefreshToken(props);
  }


  // getter

  public get userId(): string {
    return this._userId;
  }
  get token(): string { return this._token; }
  get expiresAt(): Date { return this._expiresAt; }
  get isRevoked(): boolean { return this._isRevoked; }

  get isExpired(): boolean {
    return new Date() > this._expiresAt;
  }

  get isValid(): boolean {
    return !this._isRevoked && !this.isExpired;
  }
  // factories
  revoke(): void {
    if (this._isRevoked) throw new Error('Token is already revoked');
    this._isRevoked = true;
  }
}
