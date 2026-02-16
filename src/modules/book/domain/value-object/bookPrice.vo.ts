import { ValueObject } from 'src/common/seed-works/domain/valueObject';

export class BookPrice extends ValueObject<number> {
  private static readonly MIN_CENTS = 0;
  private static readonly MAX_CENTS = 100_000_000;

  private constructor(value: number) {
    super({ value });
  }

  static create(amount: number): BookPrice {


    const cents = Math.round(amount * 100);

    if (cents < this.MIN_CENTS) {
      throw new Error('Price cannot be negative');
    }

    if (cents > this.MAX_CENTS) {
      throw new Error('Price exceeds maximum allowed value');
    }

    return new BookPrice(cents);
  }
  static fromCents(cents: number): BookPrice {
    if (!Number.isInteger(cents)) {
      throw new Error('Cents must be an integer');
    }

    if (cents < this.MIN_CENTS || cents > this.MAX_CENTS) {
      throw new Error('Invalid price range');
    }

    return new BookPrice(cents);
  }

  public add(other: BookPrice) {
    return BookPrice.fromCents(this.value + other.value);
  }
  subtract(other: BookPrice): BookPrice {
    const result = this.value - other.value;

    if (result < 0) {
      throw new Error('Resulting price cannot be negative');
    }

    return BookPrice.fromCents(result);
  }

  isGreaterThan(other: BookPrice): boolean {
    return this.value > other.value;
  }

  isLessThan(other: BookPrice): boolean {
    return this.value < other.value;
  }

  equals(other: BookPrice): boolean {
    return this.value === other.value;
  }
}
