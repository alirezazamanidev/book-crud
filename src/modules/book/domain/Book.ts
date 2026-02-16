import { AggregateRoot } from '../../../common/seed-works/domain/aggregateRoot';
import { CreateBookCommand } from '../application/commands/create-book.command';
import { BookId } from './value-object/bookId.vo';
import { BookIsbn } from './value-object/bookIsbn.vo';
import { BookLanguage } from './value-object/bookLanguage.vo';
import { BookPrice } from './value-object/bookPrice.vo';
import { BookStatus, BookStatusType } from './value-object/bookStatus.vo';
import { BookTitle } from './value-object/bookTitle.vo';

export class Book extends AggregateRoot<BookId> {
  private _title: BookTitle;
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
    book._title = BookTitle.create(command.title);
    book._price = BookPrice.create(command.price);
    book._isbn = BookIsbn.create(command.isbn);
    book._language = BookLanguage.create(command.language);
    book._status = command.status
      ? BookStatus.from(command.status)
      : BookStatus.draft();

    book.createdAt = new Date();
    book.updatedAt = new Date();

    return book;
  }

  public static reconstruct(
    id: string,
    title: string,
    price: number,
    lang: string,
    isbn: string,
    status: BookStatusType,
    createdAt: Date,
    updatedAt: Date,
  ): Book {
    const book = new Book();
    book.id = BookId.create(id);
    book._title = BookTitle.create(title);
    book._price = BookPrice.create(price);
    book._language = BookLanguage.create(lang);
    book._isbn = BookIsbn.create(isbn);
    book._status = BookStatus.from(status);
    book.createdAt = createdAt;
    book.updatedAt = updatedAt;
    return book;
  }

  public updateTitle(title: BookTitle): void {
    this._title = title;
    this.markAsUpdated();
  }

  public updatePrice(price: BookPrice): void {
    this._price = price;
    this.markAsUpdated();
  }

  public updateLanguage(language: BookLanguage): void {
    this._language = language;
    this.markAsUpdated();
  }
  public updateStatus(status: BookStatus): void {
    this._status = status;
    this.markAsUpdated();
  }

  // private methods
  private markAsUpdated(): void {
    this.updatedAt = new Date();
  }

  //getter

  public get title(): BookTitle {
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
