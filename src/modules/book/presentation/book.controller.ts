import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateBookUseCase } from '../application/use-cases/create-book.use-case';
import { CreateBookDto } from './dtos/create-book.dto';
import { BookResponseDto } from './dtos/book-response.dto';

@Controller('books')
export class BookControoler {
  constructor(private readonly createBookUseCase: CreateBookUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateBookDto) {

    const book=await this.createBookUseCase.execute({
      title: dto.title,
      status: dto.status,
      price: dto.price,
      language:dto.language,
      isbn: dto.isbn,
    });

    return {
        message:'created',
        book:BookResponseDto.fromDomain(book)
    }
  }
}
