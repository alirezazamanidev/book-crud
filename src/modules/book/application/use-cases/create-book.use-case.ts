import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { BOOK_REPOSITORY } from "../../book.constants";
import type { IBookRepository } from "../../domain/repositories/book.repository.port";
import { Book } from "../../domain/Book";
import { CreateBookCommand } from "../commands/create-book.command";
import { BookIsbn } from "../../domain/value-object/bookIsbn.vo";


@Injectable()
export  class CreateBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository,
  ) {}
  async execute(command: CreateBookCommand): Promise<Book> {

    const isbn=BookIsbn.create(command.isbn);
      const existingBook = await this.bookRepository.findByIsbn(isbn);
    if (existingBook) {
      throw new ConflictException(`Book with ISBN "${isbn.value}" already exists`);

    }

    const book=Book.create(command);
    await this.bookRepository.save(book);
    return book;
  }
}
