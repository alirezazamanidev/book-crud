import { InjectRepository } from '@nestjs/typeorm';
import { IBookRepository } from '../domain/repositories/book.repository.port';
import { Injectable, Logger } from '@nestjs/common';
import { BookEntity } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { Book } from '../domain/Book';
import { BookMapper } from './book.mapper';
@Injectable()
export class TypeOrmBookRepository implements IBookRepository {
  private readonly logger = new Logger(TypeOrmBookRepository.name);

  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async save(book: Book) {
    try {
      const entity = BookMapper.toPersistence(book);
      await this.bookRepository.save(entity);
      this.logger.debug(`Book saved: ${book.id}`);
    } catch (error) {
      this.logger.error(`Failed to save book ${book.id}:`, error);
      throw new Error(`Failed to save book: ${error.message}`);
    }
  }
  async findById(id:string): Promise<Book | null> {
    const entity = await this.bookRepository.findOne({
      where: { id: id },
    });

    if (!entity) {
      return null;
    }

    return BookMapper.toDomain(entity);
  }
  async findByIsbn(isbn: string): Promise<Book | null> {
    try {
      const entity = await this.bookRepository.findOne({
        where: { isbn: isbn },
      });

      if (!entity) {
        return null;
      }

      return BookMapper.toDomain(entity);
    } catch (error) {
      this.logger.error(`Failed to find book by ISBN ${isbn}:`, error);
      throw new Error(`Failed to find book by ISBN: ${error.message}`);
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const entities = await this.bookRepository.find({
        order: { createdAt: 'DESC' },
      });

      return BookMapper.toDomainArray(entities);
    } catch (error) {
      this.logger.error('Failed to find all books:', error);
      throw new Error(`Failed to find all books: ${error.message}`);
    }
  }
  async delete(id:string): Promise<void> {
    try {
      
      const result = await this.bookRepository.delete(id);
      if (result.affected === 0) {
        this.logger.warn(`Book with id ${id} was not found for deletion`);
      } else {
        this.logger.debug(`Book deleted: ${id}`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete book ${id}:`, error);
      throw new Error(`Failed to delete book: ${error.message}`);
    }
  }
  async exists(id: string): Promise<boolean> {
    const count = await this.bookRepository.count({
      where: { id },
    });
    return count > 0;
  }
}
