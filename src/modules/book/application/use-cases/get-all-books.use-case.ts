import { Inject, Injectable } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../../book.constants';
import type { IBookRepository } from '../../domain/repositories/book.repository.port';
import { IUseCase } from 'src/common/seed-works/application/use-case.interface';
import { BookResponseDto } from '../../presentation/dtos/book-response.dto';

@Injectable()
export class GetAllBooksUseCase implements IUseCase<undefined,BookResponseDto[]>{
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository,
  ) {}

 async execute():Promise<BookResponseDto[]> {
    const books= await this.bookRepository.findAll();
      return books.map((book) => BookResponseDto.fromDomain(book));

  }
}
