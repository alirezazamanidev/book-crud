export abstract class Entity<TId> {
  protected _createdAt: Date;
  protected _updatedAt: Date;
  protected _id: TId;

  public get id(): TId {
    return this._id;
  }

  protected set id(newValue: TId) {
    this._id = newValue;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  protected set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  protected set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}
