import { randomUUID } from 'crypto';
import { ValueObject } from 'src/common/seed-works/domain/valueObject';

export class BookId extends ValueObject<string> {
  private static readonly UUID_V4_REGEX =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  private static readonly UUID_V4_LENGTH = 36;

  private constructor({ value }: { value: string }) {
    super({ value });
  }
  public static create(id: string): BookId {
    if (!id || typeof id !== 'string') {
      throw new Error('Book ID is required');
    }

    const trimmedId = id.trim();
    if (
      !BookId.UUID_V4_REGEX.test(trimmedId) ||
      trimmedId.length !== BookId.UUID_V4_LENGTH
    ) {
      throw new Error(
        `Invalid Book ID format. Expected UUID v4, got: ${trimmedId}`,
      );
    }

    return new BookId({ value: trimmedId });
  }

  public static generate(): BookId {
    return new BookId({ value: randomUUID() });
  }
}
