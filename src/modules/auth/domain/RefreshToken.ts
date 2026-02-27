import { randomUUID } from "crypto";
import { AggregateRoot } from "../../../common/seed-works/domain/aggregateRoot";

/** Props for creating a new RefreshToken (Domain Factory) */
export interface RefreshTokenCreationProps {
  userId: string;
  expiresAt: Date;
}

/** Props for reconstituting from persistence (Redis/DB) */
export interface RefreshTokenPersistenceProps {
  id: string;
  userId: string;
  expiresAt: Date;
  isRevoked: boolean;
  createdAt: Date;
}

export interface RefreshTokenSnapshot {
  id: string;
  userId: string;
  expiresAt: string; // ISO string
  isRevoked: boolean;
  createdAt: string; // ISO string
}

export class RefreshToken extends AggregateRoot<string> {
  private _userId: string;
  private _expiresAt: Date;
  private _isRevoked: boolean;

  private constructor(props: RefreshTokenCreationProps & Partial<RefreshTokenPersistenceProps>) {
    super();
    this.id = props.id ?? randomUUID();
    this._userId = props.userId;
    this._expiresAt = props.expiresAt;
    this._isRevoked = props.isRevoked ?? false;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = this._createdAt;
  }


  static create(props: RefreshTokenCreationProps): RefreshToken {
    return new RefreshToken(props);
  }


  static reconstitute(props: RefreshTokenPersistenceProps): RefreshToken {
    return new RefreshToken(props);
  }

  /** Serialize to storage format (domain controls its representation) */
  toSnapshot(): RefreshTokenSnapshot {
    return {
      id: this.id,
      userId: this._userId,
      expiresAt: this._expiresAt.toISOString(),
      isRevoked: this._isRevoked,
      createdAt: this._createdAt.toISOString(),
    };
  }

  /** Deserialize from storage (domain controls reconstruction) */
  static fromSnapshot(snapshot: RefreshTokenSnapshot): RefreshToken {
    return RefreshToken.reconstitute({
      id: snapshot.id,
      userId: snapshot.userId,
      expiresAt: new Date(snapshot.expiresAt),
      isRevoked: snapshot.isRevoked,
      createdAt: new Date(snapshot.createdAt),
    });
  }

  public get userId(): string {
    return this._userId;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  get isRevoked(): boolean {
    return this._isRevoked;
  }

  get isExpired(): boolean {
    return new Date() > this._expiresAt;
  }

  get isValid(): boolean {
    return !this._isRevoked && !this.isExpired;
  }

  
  revoke(): void {
    this._isRevoked = true;
  }
}
