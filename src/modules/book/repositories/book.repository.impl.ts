import { Inject, Injectable, Logger } from '@nestjs/common';

import { PRISMA_PROVIDER } from '../../../common/constants/global.constants';
import { PrismaClient } from '../../prisma/generated/client';
import { BookStatus } from '../../prisma/generated/enums';
import { Book } from '../domain/Book';
import type { IBookRepository } from '../domain/repositories/book.repository.port';
import { BookMapper } from './book.mapper';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaBookRepository implements IBookRepository {
  private readonly logger = new Logger(PrismaBookRepository.name);

  constructor( private readonly prisma:PrismaService) { }

  async save(book: Book): Promise<void> {
    try {
      const data = BookMapper.toPersistence(book);
      await this.prisma.book.upsert({
        where: { id: book.id },
        create: {
          authorId: data.authorId,
          id: data.id!,
          title: data.title,
          price: data.price,
          isbn: data.isbn,
          language: data.language,
          status: data.status as BookStatus,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
        update: {
          title: data.title,
          
          price: data.price,
          language: data.language,
          status: data.status as BookStatus,
          updatedAt: data.updatedAt,
        },
      });
      this.logger.debug(`Book saved: ${book.id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to save book ${book.id}:`, error);
      throw new Error(`Failed to save book: ${message}`);
    }
  }

  async findByIdForAuthor(id: string,authorId:string): Promise<Book | null> {
    const entity = await this.prisma.book.findUnique({
      where: { id,authorId },
    });
    return BookMapper.toDomain(entity);
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    try {
      const entity = await this.prisma.book.findUnique({
        where: { isbn },
      });
      return BookMapper.toDomain(entity);
    } catch (error) {
      this.logger.error(`Failed to find book by ISBN ${isbn}:`, error);
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to find book by ISBN: ${message}`);
    }
  }

  async findAllForAuthor(authorId:string): Promise<Book[]> {
    try {
      const entities = await this.prisma.book.findMany({
        where: { authorId },
        orderBy: { createdAt: 'desc' },
      });
      return BookMapper.toDomainArray(entities);
    } catch (error) {
      this.logger.error('Failed to find all books:', error);
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to find all books: ${message}`);
    }
  }

  async deleteForAuthor(id: string,authorId:string): Promise<void> {
    try {
      const result = await this.prisma.book.deleteMany({ where: { id,authorId } });
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
    const count = await this.prisma.book.count({ where: { id } });
    return count > 0;
  }
}
