import { Prisma } from '../../prisma/generated/client';
import { Book } from '../domain/Book';

type BookWithAuthor = Prisma.BookGetPayload<{ include: { author: true } }>;

export class BookMapper {
  static toDomain(entity: BookWithAuthor | null): Book | null {
    if (!entity) return null;
    return Book.reconstruct(
      entity.uid,
      entity.author?.uid, 
      entity.title,
      +entity.price,
      entity.language,
      entity.isbn,
      entity.status,
      entity.created_at,
      entity.updated_at,
    );
  }

  static toPersistence(book: Book) {
    return {
      id: book.id,
      authorId: book.authorId,
      title: book.title,
      price: book.price,
      language: book.language,
      isbn: book.isbn,
      status: book.status,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }

  static toDomainArray(entities: BookWithAuthor[]): Book[] {
    return entities
      .map((e) => this.toDomain(e))
      .filter((b): b is Book => b !== null);
  }
}
