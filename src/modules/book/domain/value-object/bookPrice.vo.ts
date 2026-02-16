import { ValueObject } from 'src/common/seed-works/valueObject';

export class BookPrice extends ValueObject<number> {
  private static readonly MIN_PRICE = 0;
  private static readonly MAX_PRICE = 1_000_000;
  private static readonly PRECISION = 2;

  private constructor(value: number) {
    super({ value });
  }

  private static validate(value: number): void {
    if (typeof value !== 'number') {
      throw new Error('Price must be a number');
    }

    if (isNaN(value) || !isFinite(value)) {
      throw new Error('Price must be a valid number');
    }

    if (value < BookPrice.MIN_PRICE) {
      throw new Error(
        `Price cannot be negative. Minimum price: ${BookPrice.MIN_PRICE}`,
      );
    }

    if (value > BookPrice.MAX_PRICE) {
      throw new Error(
        `Price cannot exceed ${BookPrice.MAX_PRICE.toLocaleString()}`,
      );
    }
  }

  public static create(value: string | number): BookPrice {
    let numericValue: number;

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.length === 0) {
        throw new Error('Price cannot be empty');
      }

      numericValue = parseFloat(trimmed);
      if (isNaN(numericValue)) {
        throw new Error(
          `Invalid price format: "${value}"`,
        );
      }
    } else {
      numericValue = value;
    }

    BookPrice.validate(numericValue);

    // Round to 2 decimal places
    const roundedValue = Math.round(numericValue * 100) / 100;

    return new BookPrice(roundedValue);
  }

  public format(): string {
    return `$${this.value.toFixed(BookPrice.PRECISION)}`;
  }

  public isGreaterThan(price: BookPrice): boolean {
    return this.value > price.value;
  }

  public isLessThan(price: BookPrice): boolean {
    return this.value < price.value;
  }

  public equals(price: BookPrice): boolean {
    return this.value === price.value;
  }
}
