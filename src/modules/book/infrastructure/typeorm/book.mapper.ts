import { Book } from '../../domain/Book';
import { BookId } from '../../domain/value-object/bookId.vo';
import { BookIsbn } from '../../domain/value-object/bookIsbn.vo';
import { BookLanguage } from '../../domain/value-object/bookLanguage.vo';
import { BookPrice } from '../../domain/value-object/bookPrice.vo';
import {
  BookStatus,
  BookStatusType,
} from '../../domain/value-object/bookStatus.vo';
import { BookEntity } from './book.entity';

export class BookMapper {
  public static toDomain(entity: BookEntity): Book | null {
    if (!entity) return null;
    const book = Book.reconstruct(
      entity.id,
      entity.title,
      entity.price,
      entity.language,
      entity.isbn,
      entity.status as BookStatusType,
      entity.createdAt,
      entity.updatedAt,
    );

    return book;
  }

  // ---------- Domain -> DB Entity ----------
  static toPersistence(book: Book): BookEntity {
    const entity = new BookEntity();
    entity.id = book.id.value;
    entity.title = book.title.value;
    entity.price = book.price.value;
    entity.language = book.language.value;
    entity.isbn = book.isbn.value;
    entity.status = book.status.value;
    entity.createdAt = book.createdAt;
    entity.updatedAt = book.updatedAt;
    return entity;
  }
  static toDomainArray(entities: BookEntity[]): Book[] {
    return entities
      ?.map((e) => this.toDomain(e))
      .filter((b): b is Book => b !== null) ?? [];
  }

  static toPersistenceArray(books: Book[]): BookEntity[] {
    return books?.map((b) => this.toPersistence(b)) ?? [];
  }
}
