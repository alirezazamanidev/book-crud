import { ValueObject } from 'src/common/seed-works/domain/valueObject';

export class BookIsbn extends ValueObject<string> {
  public static create(isbn: string): BookIsbn {
    const cleanIsbn = isbn.replace(/[-\s]/g, '');
    if (!cleanIsbn) {
      throw new Error('ISBN cannot be empty');
    }

    if (cleanIsbn.length !== 13 || !/^\d+$/.test(cleanIsbn)) {
      throw new Error('ISBN must be exactly 13 digits');
    }

    return new BookIsbn({ value: cleanIsbn });
  }
}
