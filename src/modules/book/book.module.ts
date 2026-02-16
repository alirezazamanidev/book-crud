import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookEntity } from "./infrastructure/typeorm/book.entity";
import { BOOK_REPOSITORY } from "./book.constants";
import { TypeOrmBookRepository } from "./infrastructure/typeorm/book.repository.impl";

@Module({
  imports:[TypeOrmModule.forFeature([BookEntity])],
  providers:[
    {
      provide:BOOK_REPOSITORY,
      useClass:TypeOrmBookRepository
    }
  ]
})
export class BookModule {}
