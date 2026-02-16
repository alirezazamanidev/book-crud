import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBookUseCase } from '../application/use-cases/create-book.use-case';
import { CreateBookDto } from './dtos/create-book.dto';
import { BookResponseDto } from './dtos/book-response.dto';
import { DeleteBookUseCase } from '../application/use-cases/delete-book.use-case';
import { DeleteBookCommand } from '../application/commands/delete-book.command';
import { GetAllBooksUseCase } from '../application/use-cases/get-all-books.use-case';
import { GetBookByIdUseCase } from '../application/use-cases/get-book-by-id.use-case';
import { UpdateBookDto } from './dtos/update-book.dto';
import { UpdateBookUseCase } from '../application/use-cases/update-book.use-case';

@Controller('books')
export class BookControoler {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getAllBooksUseCase: GetAllBooksUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateBookDto) {
    const book = await this.createBookUseCase.execute({
      title: dto.title,
      status: dto.status,
      price: Number(dto.price),
      language: dto.language,
      isbn: dto.isbn,
    });

    return {
      message: 'created',
      book,
    };
  }

  @Get()
  async findAll() {
    return this.getAllBooksUseCase.execute();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookResponseDto> {
    return this.getBookByIdUseCase.execute(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    const book = await this.updateBookUseCase.execute({
      id,
      title: dto.title,
      status: dto.status,
      price: Number(dto.price),
      language: dto.language,
    });
    return {
      messsage: 'update successFully!',
      newBook: BookResponseDto.fromDomain(book),
    };
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const command: DeleteBookCommand = { id };
    await this.deleteBookUseCase.execute(command);
    return {
      message: 'remove completed!',
      bookId: id,
    };
  }
}
