export interface IProps<Tvalue> {
  value: Tvalue;
}

export abstract class ValueObject<T> {
  private _props: Readonly<IProps<T>>;

  public get value(): T {
    return this._props.value;
  }
  protected set value(value:IProps<T>){
    this._props=Object.freeze(value);
  }

    public equals(other: ValueObject<T>): boolean
    {
        return this.value === other.value;
    }

    public notEquals(other: ValueObject<T>): boolean
    {
        return !this.equals(other);
    }

    protected deepEquals(other: ValueObject<T>): boolean
    {
        return JSON.stringify(this._props) === JSON.stringify(other._props);
    }

    protected constructor (value: IProps<T>)
    {
        this.value = value;
    }
}
