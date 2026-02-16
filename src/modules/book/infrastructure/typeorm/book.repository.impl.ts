import { InjectRepository } from "@nestjs/typeorm";
import { IBookRepository } from "../../domain/repositories/book.repository.port";
import { Injectable, Logger } from "@nestjs/common";
import { BookEntity } from "./book.entity";
import { Repository } from "typeorm";
import { Book } from "../../domain/Book";
import { BookMapper } from "./book.mapper";
import { BookId } from "../../domain/value-object/bookId.vo";
import { BookIsbn } from "../../domain/value-object/bookIsbn.vo";

@Injectable()
export class TypeOrmBookRepository implements IBookRepository {
  private readonly logger = new Logger(TypeOrmBookRepository.name);

  constructor(@InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>) { }

  async save(book: Book){
    try {
      const entity = BookMapper.toPersistence(book);
      await this.bookRepository.save(entity);
      this.logger.debug(`Book saved: ${book.id.value}`);
    } catch (error) {
      this.logger.error(`Failed to save book ${book.id.value}:`, error);
      throw new Error(`Failed to save book: ${error.message}`);
    }
  }
  async findById(id: BookId): Promise<Book | null> {
    try {
      const entity = await this.bookRepository.findOne({
        where: { id: id.value },
      });

      if (!entity) {
        return null;
      }

      return BookMapper.toDomain(entity);
    } catch (error) {
      this.logger.error(`Failed to find book by id ${id.value}:`, error);
      throw new Error(`Failed to find book: ${error.message}`);
    }
  }
  async findByIsbn(isbn: BookIsbn): Promise<Book | null> {
    try {
      const entity = await this.bookRepository.findOne({
        where: { isbn: isbn.value },
      });

      if (!entity) {
        return null;
      }

      return BookMapper.toDomain(entity);
    } catch (error) {
      this.logger.error(`Failed to find book by ISBN ${isbn.value}:`, error);
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
  async delete(id: BookId): Promise<void> {
    try {
      const result = await this.bookRepository.delete(id.value);
      if (result.affected === 0) {
        this.logger.warn(`Book with id ${id.value} was not found for deletion`);
      } else {
        this.logger.debug(`Book deleted: ${id.value}`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete book ${id.value}:`, error);
      throw new Error(`Failed to delete book: ${error.message}`);
    }
  }
  async exists(id: BookId): Promise<boolean> {
    try {
      const count = await this.bookRepository.count({
        where: { id: id.value },
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check book existence ${id.value}:`, error);
      throw new Error(`Failed to check book existence: ${error.message}`);
    }
  }
}
