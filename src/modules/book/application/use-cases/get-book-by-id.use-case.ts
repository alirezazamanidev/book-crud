import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../../book.constants';
import type { IBookRepository } from '../../domain/repositories/book.repository.port';
import { BookId } from '../../domain/value-object/bookId.vo';
import { IUseCase } from 'src/common/seed-works/application/use-case.interface';
import { BookResponseDto } from '../../presentation/dtos/book-response.dto';

@Injectable()
export class GetBookByIdUseCase implements IUseCase<string,BookResponseDto> {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(id:string):Promise<BookResponseDto>{
    const bookId=BookId.create(id);
    const book=await this.bookRepository.findById(bookId);
    if(!book) throw new NotFoundException("The book not founded!");

    return BookResponseDto.fromDomain(book);
  }
}
