import { Entity } from './entity';

export abstract class AggregateRoot<TId> extends Entity<TId> {
  public equals(anEntity: Entity<TId>): boolean {
    if (this === anEntity) {
      return true;
    }

    if (anEntity instanceof Entity && this.id === anEntity.id) {
      return true;
    }
    return false;
  }
}
