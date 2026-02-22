import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookStatus } from '../../prisma/generated/enums';
import { BOOK_REPOSITORY } from '../book.constants';
import { Book } from '../domain/Book';
import type { IBookRepository } from '../domain/repositories/book.repository.port';
import { BookResponseDto } from '../http/dtos/book-response.dto';
import { CreateBookDto } from '../http/dtos/create-book.dto';
import { UpdateBookDto } from '../http/dtos/update-book.dto';


@Injectable()
export class BookService {
  constructor(
    @Inject(BOOK_REPOSITORY) private bookRepository: IBookRepository,
  ) { }

  async create(dto: CreateBookDto,authorId:string) {

    const existingBook = await this.bookRepository.findByIsbn(dto.isbn);
    if (existingBook) {
      throw new ConflictException(
        `Book with ISBN "${dto.isbn}" already exists`,
      );
    }
    
    const book = Book.create({
      title: dto.title,
      authorId,
      price: dto.price,
      isbn: dto.isbn,
      lang: dto.language,
      status: dto.status ?? BookStatus.DRAFT
    });
    await this.bookRepository.save(book);
    return {
      message: 'The book Created!',
      book: BookResponseDto.fromDomain(book),
    };
  }
  async findAll(authorId:string) {
    const books = await this.bookRepository.findAllForAuthor(authorId);
    return books.map((book) => BookResponseDto.fromDomain(book));
  }
  async findOne(id: string,authorId:string) {

    const book = await this.bookRepository.findByIdForAuthor(id,authorId);
    if (!book) throw new NotFoundException('The book not founded!');

    return BookResponseDto.fromDomain(book);
  }
  async update(id: string,authorId:string, dto: UpdateBookDto) {
    const book = await this.bookRepository.findByIdForAuthor(id,authorId);
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

  async delete(id: string,authorId:string) {
    await this.bookRepository.deleteForAuthor(id,authorId);
    return {
      message: 'Removed successfully.',
      bookId: id,
    };
  }
}
