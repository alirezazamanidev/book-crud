import { Inject, Injectable } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../../book.constants';
import type { IBookRepository } from '../../domain/repositories/book.repository.port';
import { Book } from '../../domain/Book';

@Injectable()
export class GetAllBooksUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository,
  ) {}

  execute() {
    return this.bookRepository.findAll();
  }
}
