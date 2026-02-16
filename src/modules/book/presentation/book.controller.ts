import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateBookUseCase } from '../application/use-cases/create-book.use-case';
import { CreateBookDto } from './dtos/create-book.dto';
import { BookResponseDto } from './dtos/book-response.dto';
import { DeleteBookUseCase } from '../application/use-cases/delete-book.use-case';
import { DeleteBookCommand } from '../application/commands/delete-book.command';
import { GetAllBooksUseCase } from '../application/use-cases/get-all-books.use-case';

@Controller('books')
export class BookControoler {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getAllBooksUseCase: GetAllBooksUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateBookDto) {
    const book = await this.createBookUseCase.execute({
      title: dto.title,
      status: dto.status,
      price: dto.price,
      language: dto.language,
      isbn: dto.isbn,
    });

    return {
      message: 'created',
      book: BookResponseDto.fromDomain(book),
    };
  }

  @Get()
   async findAll(){
       const books = await this.getAllBooksUseCase.execute();
    return books.map((book) => BookResponseDto.fromDomain(book));
   }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const command: DeleteBookCommand = { id };
    await this.deleteBookUseCase.execute(command);
    return {
        message:'remove completed!',
        bookId:id
    }
  }
}
