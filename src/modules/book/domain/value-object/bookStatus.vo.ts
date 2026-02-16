import { ValueObject } from 'src/common/seed-works/valueObject';
export type BookStatusType = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export class BookStatus extends ValueObject<BookStatusType> {


  private static readonly VALID_STATUSES=['DRAFT','PUBLISHED','ARCHIVED']
  private constructor(value:BookStatusType){
    super({value})

  }

    static from(value: string): BookStatus {
  if (!BookStatus.isValid(value)) {
      throw new Error(
        `Invalid book status. Valid statuses are: ${BookStatus.VALID_STATUSES.join(', ')}`
      );
    }

    return new BookStatus(value);
  }

  static draft(): BookStatus {
    return new BookStatus('DRAFT');
  }
  private static isValid(value: string): value is BookStatusType {
    return (BookStatus.VALID_STATUSES as readonly string[]).includes(value);
  }
  static published(): BookStatus {
    return new BookStatus('PUBLISHED');
  }

  static archived(): BookStatus {
    return new BookStatus('ARCHIVED');
  }

  get isDraft(): boolean {
    return this.value === 'DRAFT';
  }

  get isPublished(): boolean {
    return this.value === 'PUBLISHED';
  }

  get isArchived(): boolean {
    return this.value === 'ARCHIVED';
  }
}
