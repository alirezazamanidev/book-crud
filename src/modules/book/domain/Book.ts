import { AggregateRoot } from "../../../common/seed-works/aggregateRoot";
import { BookId } from "./value-object/bookId.vo";
import { BookIsbn } from "./value-object/bookIsbn.vo";
import { BookPrice } from "./value-object/bookPrice.vo";
import { BookStatus } from "./value-object/bookStatus.vo";


export class Book extends AggregateRoot<BookId> {

  private _title: string;

  private _price:BookPrice;
  private _isbn:BookIsbn
  private status:BookStatus

  private constructor(){
    super()
  }

}
