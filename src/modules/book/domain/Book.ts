import { AggregateRoot } from "../../../common/seed-works/aggregateRoot";
import { BookId } from "./value-object/bookId.vo";
import { BookIsbn } from "./value-object/bookIsbn.vo";
import { BookPrice } from "./value-object/bookPrice.vo";
import { BookStatus } from "./value-object/bookStatus.vo";


export class Book extends AggregateRoot<BookId> {

  private _title: string;
  private _price: BookPrice;
  private _isbn: BookIsbn
  private _status: BookStatus

  private constructor() {
    super()
  }


  public static reconstruct(
    id: BookId,
    title: string,
    price: BookPrice,
    isbn: BookIsbn,
    status: BookStatus,

  ): Book {

    const book = new Book();
    book.id = id;
    book.title = title;
    book.price = price;
    book.isbn = isbn;
    book.status = status;
    book.createdAt =new Date()
    book.updatedAt =new Date()

    return book;
  }
  public updateTitle(title: string): void {

    this.title = title;
    this.markAsUpdated();
  }

  public updatePrice(price: BookPrice): void {
    this.price = price;
    this.markAsUpdated();
  }

  public updateStatus(status: BookStatus): void {
    this.status = status;
    this.markAsUpdated();
  }

  public publish(): void {
    if (!this.status.canBePublished()) {
      throw new Error(
        `Cannot publish book. Current status: ${this.status.value}`,
      );
    }
    this.status = BookStatus.published();
    this.markAsUpdated();
  }

  public archive(): void {
    if (!this.status.canBeArchived()) {
      throw new Error(
        `Cannot archive book. Current status: ${this.status.value}`,
      );
    }
    this.status = BookStatus.archived();
    this.markAsUpdated();
  }


  // private methods
  private markAsUpdated(): void {
    this.updatedAt = new Date();
  }
  //setter
  public set title(title: string) {
    if (!title || typeof title !== 'string') {
      throw new Error('Book title is required');
    }

    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 3) {
      throw new Error(
        'Book title must be at least 3 characters long',
      );
    }

    if (trimmedTitle.length > 255) {
      throw new Error(
        'Book title must not exceed 255 characters',
      );
    }
    this._title = title;
  }
  public set status(status: BookStatus) {
    this._status = status;
  }
  public set price(price: BookPrice) {
    this._price = price;
  }
  public set isbn(isbn: BookIsbn) {
    this._isbn = isbn;
  }

  //getter

  public get title(): string {
    return this._title;
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
