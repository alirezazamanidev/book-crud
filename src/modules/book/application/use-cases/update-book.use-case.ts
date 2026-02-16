import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../../book.constants';
import type { IBookRepository } from '../../domain/repositories/book.repository.port';
import { UpdateBookCommand } from '../commands/update-book.command';
import { BookId } from '../../domain/value-object/bookId.vo';
import { BookStatus } from '../../domain/value-object/bookStatus.vo';
import { BookPrice } from '../../domain/value-object/bookPrice.vo';
import { BookTitle } from '../../domain/value-object/bookTitle.vo';
import { BookLanguage } from '../../domain/value-object/bookLanguage.vo';

@Injectable()
export class UpdateBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(command: UpdateBookCommand) {
    const bookId = BookId.create(command.id);
    const book = await this.bookRepository.findById(bookId);
    if (!book) throw new NotFoundException('The book not founded');
    if (command.title) book.updateTitle(BookTitle.create(command.title));
    if (command.status) book.updateStatus(BookStatus.from(command.status));

    if (command.language) book.updateLanguage(BookLanguage.create(command.language));
    if (command.price) book.updatePrice(BookPrice.create(command.price));

    await this.bookRepository.save(book);
    return book;
  }
}
