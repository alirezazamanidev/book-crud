import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BOOK_REPOSITORY } from '../book.constants';
import type { IBookRepository } from '../domain/repositories/book.repository.port';
import { CreateBookDto } from '../http/dtos/create-book.dto';
import { Book } from '../domain/Book';
import { BookResponseDto } from '../http/dtos/book-response.dto';
import { UpdateBookDto } from '../http/dtos/update-book.dto';
import { BookStatus } from '../../../prisma/generated/enums';


@Injectable()
export class BookService {
  constructor(
    @Inject(BOOK_REPOSITORY) private bookRepository: IBookRepository,
  ) {}

  async create(dto: CreateBookDto) {

    const existingBook = await this.bookRepository.findByIsbn(dto.isbn);
    if (existingBook) {
      throw new ConflictException(
        `Book with ISBN "${dto.isbn}" already exists`,
      );
    }

    const book = Book.create({
        title:dto.title,
        price:dto.price,
        isbn:dto.isbn,
        lang:dto.language,
        status: dto.status ?? BookStatus.DRAFT
    });
    await this.bookRepository.save(book);
    return {
      message: 'The book Created!',
      book: BookResponseDto.fromDomain(book),
    };
  }
  async findAll() {
    const books = await this.bookRepository.findAll();
    return books.map((book) => BookResponseDto.fromDomain(book));
  }
  async findOne(id: string) {

    const book = await this.bookRepository.findById(id);
    if (!book) throw new NotFoundException('The book not founded!');

    return BookResponseDto.fromDomain(book);
  }
  async update(id: string, dto: UpdateBookDto) {
    const book = await this.bookRepository.findById(id);
    if (!book) throw new NotFoundException('The book not founded');
    if (dto.title) book.updateTitle(dto.title);
    if (dto.status) book.updateStatus(dto.status);

    if (dto.language) book.updateLanguage(dto.language)
    if (dto.price) book.updatePrice(dto.price);

    await this.bookRepository.save(book);

    return {
      message: 'Updated successfully.',
      newBook: BookResponseDto.fromDomain(book),
    };
  }

  async delete(id: string) {
    await this.bookRepository.delete(id);
    return {
      message: 'Removed successfully.',
      bookId: id,
    };
  }
}
