import { AggregateRoot } from '../../../common/seed-works/aggregateRoot';
import { CreateBookCommand } from '../application/commands/create-book.command';
import { BookId } from './value-object/bookId.vo';
import { BookIsbn } from './value-object/bookIsbn.vo';
import { BookLanguage } from './value-object/bookLanguage.vo';
import { BookPrice } from './value-object/bookPrice.vo';
import { BookStatus, BookStatusType } from './value-object/bookStatus.vo';
import { BookTitle } from './value-object/bookTitle.vo';

interface BookProps {
  title: string;
  price: string | number;
  isbn: string;
  language: string;
  status: BookStatusType;
}
export class Book extends AggregateRoot<BookId> {
  private _title: BookTitle
  private _price: BookPrice;
  private _isbn: BookIsbn;
  private _status: BookStatus;
  private _language: BookLanguage;

  private constructor() {
    super();
  }

  public static create(command: CreateBookCommand): Book {
    const book = new Book();
    book.id = BookId.generate();
    book.isbn = BookIsbn.create(command.isbn);
    book.language = BookLanguage.create(command.language);
    book.status = command.status
      ? BookStatus.from(command.status)
      : BookStatus.draft();
    book.title = command.title;
    book.price = BookPrice.create(command.price);
    book.createdAt = new Date();
    book.updatedAt = new Date();
    return book;
  }
public static reconstruct(
  id: BookId,
  title: string,
  price: BookPrice,
  lang: BookLanguage,
  isbn: BookIsbn,
  status: BookStatus,
  createdAt: Date,
  updatedAt: Date
): Book {
  const book = new Book();
  book.id = id;
  book.title = title;
  book.price = price;
  book.language = lang;
  book.isbn = isbn;
  book.status = status;
  book.createdAt = createdAt;
  book.updatedAt = updatedAt;
  return book;
}


  public updateTitle(title: string): void {
    this.title = title;
    this.markAsUpdated();
  }

  public updatePrice(price: string): void {
    this.price = BookPrice.create(price);
    this.markAsUpdated();
  }

  public updateLanguage(language: string): void {
    this.language = BookLanguage.create(language);
    this.markAsUpdated();
  }
  public updateStatus(status: string): void {
    this.status = BookStatus.from(status as any)
    this.markAsUpdated();
  }


  // private methods
  private markAsUpdated(): void {
    this.updatedAt = new Date();
  }
  //setter
  //getter

  public get title(): string {
    return this._title;
  }
  public get language(): BookLanguage {
    return this._language;
  }
  public get price(): BookPrice {
    return this._price;
  }

  public get isbn(): BookIsbn {
    return this._isbn;
  }

  public get status(): BookStatus {
    return this._status;
  }
}
