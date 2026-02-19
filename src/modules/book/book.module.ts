import { Module } from '@nestjs/common';
import { BOOK_REPOSITORY } from './book.constants';
import { PrismaBookRepository } from './repositories/book.repository.impl';
import { BookController } from './http/controllers/book.controller';
import { BookService } from './services/book.service';

@Module({
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: BOOK_REPOSITORY,
      useClass: PrismaBookRepository,
    },
  ],
})
export class BookModule {}
