import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateBookUseCase } from '../application/use-cases/create-book.use-case';
import { CreateBookDto } from './dtos/create-book.dto';
import { BookResponseDto } from './dtos/book-response.dto';
import { DeleteBookUseCase } from '../application/use-cases/delete-book.use-case';
import { DeleteBookCommand } from '../application/commands/delete-book.command';

@Controller('books')
export class BookControoler {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,

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
