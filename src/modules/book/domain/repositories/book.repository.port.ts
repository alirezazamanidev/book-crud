import { Book } from '../Book';


export interface IBookRepository {
  save(book: Book): Promise<void>;
  findByIdForAuthor(id: string,authorId:string): Promise<Book | null>;
  findByIsbn(isbn:string): Promise<Book | null>;
  findAllForAuthor(authorId:string): Promise<Book[]>;
  deleteForAuthor(id: string,authorId:string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
