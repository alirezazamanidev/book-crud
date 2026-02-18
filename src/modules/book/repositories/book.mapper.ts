import { Book } from '../domain/Book';
import { BookEntity } from '../entities/book.entity';

export class BookMapper {
  public static toDomain(entity: BookEntity): Book | null {
    if (!entity) return null;
    const price = typeof entity.price === 'string' ? Number(entity.price) : entity.price;
    const book = Book.reconstruct(
      entity.id,
      entity.title,
      price,
      entity.language,
      entity.isbn,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
    return book;
  }

  // ---------- Domain -> DB Entity ----------
  static toPersistence(book: Book): BookEntity {
    const entity = new BookEntity();
    entity.id = book.id;
    entity.title = book.title;
    entity.price = book.price;
    entity.language = book.language;
    entity.isbn = book.isbn;
    entity.status = book.status;
    entity.createdAt = book.createdAt;
    entity.updatedAt = book.updatedAt;
    return entity;
  }
  static toDomainArray(entities: BookEntity[]): Book[] {
    return (
      entities
        ?.map((e) => this.toDomain(e))
        .filter((b): b is Book => b !== null) ?? []
    );
  }

  static toPersistenceArray(books: Book[]): BookEntity[] {
    return books?.map((b) => this.toPersistence(b)) ?? [];
  }
}
