import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookEntity } from "./infrastructure/typeorm/book.entity";
import { BOOK_REPOSITORY } from "./book.constants";
import { TypeOrmBookRepository } from "./infrastructure/typeorm/book.repository.impl";
import { CreateBookUseCase } from "./application/use-cases/create-book.use-case";
import { BookControoler } from "./presentation/book.controller";
import { DeleteBookUseCase } from "./application/use-cases/delete-book.use-case";
import { GetAllBooksUseCase } from "./application/use-cases/get-all-books.use-case";

@Module({
  imports:[TypeOrmModule.forFeature([BookEntity])],
  controllers:[BookControoler],
  providers:[
    CreateBookUseCase,
    DeleteBookUseCase,
    GetAllBooksUseCase,

    {
      provide:BOOK_REPOSITORY,
      useClass:TypeOrmBookRepository
    }
  ]
})
export class BookModule {}
