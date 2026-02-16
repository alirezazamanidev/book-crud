import { ValueObject } from 'src/common/seed-works/valueObject';

export class BookIsbn extends ValueObject<string> {
public static create(isbn: string): BookIsbn {
    // حذف خط تیره‌ها و فاصله‌های اضافی
    const cleanIsbn = isbn.replace(/[-\s]/g, '');

    // اعتبارسنجی ساده
    if (!cleanIsbn) {
      throw new Error('ISBN cannot be empty');
    }

    if (cleanIsbn.length !== 13 || !/^\d+$/.test(cleanIsbn)) {
      throw new Error('ISBN must be exactly 13 digits');
    }

    return new BookIsbn({value:cleanIsbn});
  }

}
