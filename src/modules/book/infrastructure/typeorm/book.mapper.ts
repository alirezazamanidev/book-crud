import { Book } from "../../domain/Book";
import { BookId } from "../../domain/value-object/bookId.vo";
import { BookIsbn } from "../../domain/value-object/bookIsbn.vo";
import { BookLanguage } from "../../domain/value-object/bookLanguage.vo";
import { BookPrice } from "../../domain/value-object/bookPrice.vo";
import { BookStatus } from "../../domain/value-object/bookStatus.vo";
import { BookEntity } from "./book.entity";


export class BookMapper {
  static toDomain(entity: BookEntity): Book {
    if (!entity) {
      throw new Error('Cannot map null or undefined entity to domain');
    }

    try {
      return Book.reconstruct(
        BookId.create(entity.id),
        entity.title,
        BookPrice.create(entity.price),
        BookLanguage.create(entity.language),
        BookIsbn.create(entity.isbn),
        BookStatus.from(entity.status as any),

      );
    } catch (error) {
      throw new Error(
        `Failed to map BookEntity to Book domain: ${error.message}`,
      );
    }
  }

  public static toPersistence(book: Book): BookEntity {
    if (!book) {
      throw new Error('Cannot map null or undefined book to entity');
    }

    try {
      const entity = new BookEntity();
      entity.id = book.id.value;
      entity.title = book.title;
      entity.price = book.price.value;
      entity.language=book.language.value;
      entity.isbn = book.isbn.value;
      entity.status = book.status.value;
      entity.createdAt = book.createdAt;
      entity.updatedAt = book.updatedAt;
      return entity;
    } catch (error) {
      throw new Error(`Failed to map Book to BookEntity: ${error.message}`);
    }
  }

  static toDomainArray(entities: BookEntity[]): Book[] {
    if (!entities || entities.length === 0) {
      return [];
    }

    return entities.map((entity) => this.toDomain(entity));
  }
}
