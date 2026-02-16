import { AggregateRoot } from "../../../common/seed-works/aggregateRoot";
import { BookId } from "./value-object/bookId.vo";
import { BookPrice } from "./value-object/bookPrice.vo";


export class Book extends AggregateRoot<BookId> {

  private _title: string;

  private _price:BookPrice;
  
}
