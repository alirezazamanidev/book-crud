import { randomUUID } from 'crypto';
import { AggregateRoot } from '../../../common/seed-works/domain/aggregateRoot';

export class Book extends AggregateRoot<string> {
  private _authorId: string;
  private _title: string;
  private _price: number;
  private _isbn: string;
  private _status: string;
  private _language: string;

  private constructor() {
    super();
  }

  public static create({
    authorId,
    title,
    price,
    isbn,
    status,
    lang,
  }: {
    authorId: string;
    title: string;
    price:number
    isbn: string;
    status: string;
    lang: string;
  }): Book {
    const book = new Book();

    book.id = randomUUID().toString();
    book._authorId = authorId;
    book._title = title;
    book._price = price;
    book._language = lang;
    book._status = status;
    book._isbn = isbn;
    book.createdAt = new Date();
    book.updatedAt = new Date();

    return book;
  }

  public static reconstruct(
    id: string,
    authorId: string,
    title: string,
    price:number,
    lang: string,
    isbn: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
  ): Book {
    const book = new Book();
    book.id = id;
    book._authorId = authorId;
    book._title = title;
    book._price = price;
    book._language = lang
    book._isbn =isbn
    book._status =status;
    book.createdAt = createdAt;
    book.updatedAt = updatedAt;
    return book;
  }

  public updateTitle(title: string): void {
    this._title = title;
    this.markAsUpdated();
  }

  public updatePrice(price: number): void {
    this._price = price;
    this.markAsUpdated();
  }

  public updateLanguage(language:string): void {
    this._language = language;
    this.markAsUpdated();
  }
  public updateStatus(status:string): void {
    this._status = status;
    this.markAsUpdated();
  }

  // private methods
  private markAsUpdated(): void {
    this.updatedAt = new Date();
  }

  //getter

  public get title():string{
    return this._title;
  }
  public get language(): string {
    return this._language;
  }
  public get price():number {
    return this._price;
  }
  public get authorId(): string {
    return this._authorId;
  }
  public get isbn(): string {
    return this._isbn;
  }

  public get status(): string {
    return this._status;
  }
}
