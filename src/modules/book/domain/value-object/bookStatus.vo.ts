import { ValueObject } from 'src/common/seed-works/valueObject';
export type BookStatusType = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export class BookStatus extends ValueObject<BookStatusType> {
  private static readonly VALID_STATUSES: readonly BookStatusType[] = [
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED',
  ] as const;

  private constructor(value: BookStatusType) {
    super({ value });
  }

  public static from(value: BookStatusType): BookStatus {
    if (!BookStatus.VALID_STATUSES.includes(value)) {
      throw new Error(
        `Invalid book status. Valid statuses are: ${BookStatus.VALID_STATUSES.join(', ')}`,
      );
    }
    return new BookStatus(value);
  }

  public static draft(): BookStatus {
    return new BookStatus('DRAFT');
  }

  public static published(): BookStatus {
    return new BookStatus('PUBLISHED');
  }

  public static archived(): BookStatus {
    return new BookStatus('ARCHIVED');
  }

  public canBePublished(): boolean {
    return this.value === 'DRAFT';
  }

  public canBeArchived(): boolean {
    return this.value !== 'ARCHIVED';
  }

  public canTransitionTo(targetStatus: BookStatusType): boolean {
    if (this.value === 'DRAFT' && targetStatus === 'PUBLISHED') {
      return true;
    }
    if (this.value !== 'ARCHIVED' && targetStatus === 'ARCHIVED') {
      return true;
    }
    return false;
  }

  public isPublished(): boolean {
    return this.value === 'PUBLISHED';
  }

  public isDraft(): boolean {
    return this.value === 'DRAFT';
  }

  public isArchived(): boolean {
    return this.value === 'ARCHIVED';
  }
}
