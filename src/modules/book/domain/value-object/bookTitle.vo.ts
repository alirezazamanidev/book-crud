import { ValueObject } from 'src/common/seed-works/domain/valueObject';

export class BookTitle extends ValueObject<string> {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 255;
  private static readonly FORBIDDEN_CHARS_REGEX = /[<>;'"]/;

  private constructor(value: string) {
    super({ value });
  }
  // ---------- Factory ----------
  public static create(title: string): BookTitle {
    if (!title || typeof title !== 'string') {
      throw new Error('Book title is required');
    }

    const trimmed = title.trim();

    if (trimmed.length < BookTitle.MIN_LENGTH) {
      throw new Error(
        `Book title must be at least ${BookTitle.MIN_LENGTH} characters long`,
      );
    }

    if (trimmed.length > BookTitle.MAX_LENGTH) {
      throw new Error(
        `Book title must not exceed ${BookTitle.MAX_LENGTH} characters`,
      );
    }

    if (BookTitle.FORBIDDEN_CHARS_REGEX.test(trimmed)) {
      throw new Error(
        'Book title contains forbidden characters (e.g., < > \' ")',
      );
    }

    return new BookTitle(trimmed);
  }
  public contains(keyword: string): boolean {
    return this.value.toLowerCase().includes(keyword.toLowerCase());
  }
  public truncate(maxLength: number): BookTitle {
    if (maxLength < 1) {
      throw new Error('maxLength must be at least 1');
    }
    const truncated =
      this.value.length > maxLength
        ? this.value.slice(0, maxLength)
        : this.value;
    return new BookTitle(truncated);
  }
}
