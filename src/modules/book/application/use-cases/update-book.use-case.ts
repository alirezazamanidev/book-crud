import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../../book.constants';
import type { IBookRepository } from '../../domain/repositories/book.repository.port';
import { UpdateBookCommand } from '../commands/update-book.command';
import { BookId } from '../../domain/value-object/bookId.vo';
import { BookStatus } from '../../domain/value-object/bookStatus.vo';
import { BookPrice } from '../../domain/value-object/bookPrice.vo';

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
    if (command.title) book.updateTitle(command.title);
    if (command.status) book.updateStatus(command.status);

    if (command.language) book.updateLanguage(command.language);
    if (command.price) book.updatePrice(command.price);

    await this.bookRepository.save(book);
    return book;
  }
}
