import { Book } from '../../domain/Book';

export class BookResponseDto {
  id: string;
  title: string;
  price: number;
  isbn: string;
  language: string | null;

  status: string;
  createdAt: Date;
  updatedAt: Date;

  static fromDomain(book: Book): BookResponseDto {
    const dto = new BookResponseDto();
    dto.id = book.id
    dto.title = book.title
    dto.price = book.price
    dto.isbn = book.isbn
    dto.language = book.language;

    dto.status = book.status
    dto.createdAt = book.createdAt;
    dto.updatedAt = book.updatedAt;
    return dto;
  }
}
