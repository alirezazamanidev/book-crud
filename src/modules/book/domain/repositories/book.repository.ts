import { Book } from '../Book';
import { BookId } from '../value-object/bookId.vo';
import { BookIsbn } from '../value-object/bookIsbn.vo';

export interface IBookRepository {
  save(book: Book): Promise<void>;
  findById(id: BookId): Promise<Book | null>;
  findByIsbn(isbn: BookIsbn): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  delete(id: BookId): Promise<void>;
  exists(id: BookId): Promise<boolean>;
}
