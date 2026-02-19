
import { Book } from '../domain/Book';
import type { Book as BookEntity } from '../../../prisma/generated/client';
/** Maps between domain Book and Prisma Book model. */
export class BookMapper {
  static toDomain(entity: BookEntity | null): Book | null {
    if (!entity) return null;
    const price =
      typeof entity.price === 'object' && entity.price !== null && 'toNumber' in entity.price
        ? (entity.price as { toNumber(): number }).toNumber()
        : Number(entity.price);
    return Book.reconstruct(
      entity.id,
      entity.title,
      price,
      entity.language,
      entity.isbn,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  /** Domain -> Prisma create/update payload (no id for create). */
  static toPersistence(book: Book) {
    return {
      id: book.id,
      title: book.title,
      price: book.price,
      language: book.language,
      isbn: book.isbn,
      status: book.status,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }

  static toDomainArray(entities: BookEntity[]){
    return (
      entities
        ?.map((e) => this.toDomain(e))
        .filter((b): b is Book => b !== null) ?? []
    );
  }
}
