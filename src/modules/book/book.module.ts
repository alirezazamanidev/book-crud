import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { BOOK_REPOSITORY } from './book.constants';
import { TypeOrmBookRepository } from './repositories/book.repository.impl';
import { BookController } from './http/controllers/book.controller';
import { BookService } from './services/book.service';
@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: BOOK_REPOSITORY,
      useClass: TypeOrmBookRepository,
    },
  ],
})
export class BookModule {}
