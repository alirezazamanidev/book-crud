import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BookStatus } from '../../prisma/generated/enums';
import { Book } from '../domain/Book';
import type { IBookRepository } from '../domain/repositories/book.repository.port';
import { BookMapper } from './book.mapper';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaBookRepository implements IBookRepository {
  private readonly logger = new Logger(PrismaBookRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async save(book: Book): Promise<void> {
    try {
      const data = BookMapper.toPersistence(book);
      const author = await this.prisma.user.findUnique({
        where: { uid: data.authorId },
        select: { id: true },
      });
      if(!author) throw new NotFoundException('author not found')
      await this.prisma.book.upsert({
        where: { uid: book.id },
        create: {
        author_id: author.id,
          uid: data.id,
          title: data.title,
          price: data.price,
          isbn: data.isbn,
          language: data.language,
          status: data.status as BookStatus,
          created_at: data.createdAt,
          updated_at: data.updatedAt,
        },
        update: {
          title: data.title,
          price: data.price,
          language: data.language,
          status: data.status as BookStatus,
          updated_at: data.updatedAt,
        },
      });
      this.logger.debug(`Book saved: ${book.id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to save book ${book.id}:`, error);
      throw new Error(`Failed to save book: ${message}`);
    }
  }

  async findByIdForAuthor(id: string, authorId: string): Promise<Book | null> {
    try {
      const entity = await this.prisma.book.findUnique({
        where: {
          uid: id,
          author: { uid: authorId },
        },
        include: { author: true },
      });
      return BookMapper.toDomain(entity);
    } catch (error) {
      this.logger.error(`Failed to find book by id ${id} for author ${authorId}:`, error);
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to find book: ${message}`);
    }
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    try {
      const entity = await this.prisma.book.findUnique({
        where: { isbn },
        include: { author: true },
      });
      return BookMapper.toDomain(entity);
    } catch (error) {
      this.logger.error(`Failed to find book by ISBN ${isbn}:`, error);
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to find book by ISBN: ${message}`);
    }
  }

  async findAllForAuthor(authorId: string): Promise<Book[]> {
    try {
      const entities = await this.prisma.book.findMany({
        where: {
          author: { uid: authorId },
        },
        include: { author: true },
        orderBy: { created_at: 'desc' },
      });
      return BookMapper.toDomainArray(entities);
    } catch (error) {
      this.logger.error('Failed to find all books for author:', error);
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to find all books: ${message}`);
    }
  }

  async deleteForAuthor(id: string, authorId: string): Promise<void> {
    try {
      const result = await this.prisma.book.deleteMany({
        where: {
          uid: id,
          author: { uid: authorId },
        },
      });
      if (result.count === 0) {
        this.logger.warn(`Book with id ${id} was not found for deletion`);
      } else {
        this.logger.debug(`Book deleted: ${id}`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete book ${id}:`, error);
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to delete book: ${message}`);
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.prisma.book.count({
        where: { uid: id },
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check existence of book ${id}:`, error);
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to check book existence: ${message}`);
    }
  }
}
