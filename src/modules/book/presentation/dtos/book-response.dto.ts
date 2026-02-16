import { Book } from "../../domain/Book";

export class BookResponseDto {
  id: string;
  title: string;
  author: string;
  price: number;
  isbn: string;

  language: string | null;
  
  status: string;
  createdAt: Date;
  updatedAt: Date;

  static fromDomain(book: Book): BookResponseDto {
    const dto = new BookResponseDto();
    dto.id = book.id.value;
    dto.title = book.title;
    dto.price = book.price.value;
    dto.isbn = book.isbn.value;
    dto.language = book.language ? book.language.value : null;

    dto.status = book.status.value;
    dto.createdAt = book.createdAt;
    dto.updatedAt = book.updatedAt;
    return dto;
  }
}
