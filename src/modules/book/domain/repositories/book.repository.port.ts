import { Book } from '../Book';


export interface IBookRepository {
  save(book: Book): Promise<void>;
  findById(id: string): Promise<Book | null>;
  findByIsbn(isbn:string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
