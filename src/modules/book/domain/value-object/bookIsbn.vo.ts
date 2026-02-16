import { ValueObject } from 'src/common/seed-works/valueObject';

export class BookIsbn extends ValueObject<string> {
  private static readonly ISBN_13_REGEX = /^\d{13}$/;
  private static readonly ISBN_13_LENGTH = 13;

  public static create(raw: string): BookIsbn {
    if (!raw || typeof raw !== 'string') {
      throw new Error('ISBN is required');
    }

    const normalized = raw.replace(/-/g, '').trim();

    if (normalized.length === 0) {
      throw new Error('ISBN cannot be empty');
    }

    if (!BookIsbn.ISBN_13_REGEX.test(normalized)) {
      throw new Error(
        `Invalid ISBN format. Expected 13 digits, got: ${raw}`,
      );
    }

    if (normalized.length !== BookIsbn.ISBN_13_LENGTH) {
      throw new Error(
        `ISBN must be exactly ${BookIsbn.ISBN_13_LENGTH} digits`,
      );
    }

    return new BookIsbn({ value: normalized });
  }
}
