import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../../book.constants';
import type { IBookRepository } from '../../domain/repositories/book.repository.port';
import { BookId } from '../../domain/value-object/bookId.vo';

@Injectable()
export class GetBookByIdUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(id:string){
    const bookId=BookId.create(id);
    const book=await this.bookRepository.findById(bookId);
    if(!book) throw new NotFoundException("The book not founded!");
    return book;
  }
}
