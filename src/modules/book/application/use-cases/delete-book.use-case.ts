import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../../book.constants';
import type { IBookRepository } from '../../domain/repositories/book.repository.port';
import { BookId } from '../../domain/value-object/bookId.vo';
import { DeleteBookCommand } from '../commands/delete-book.command';
import { IUseCase } from 'src/common/seed-works/application/use-case.interface';

@Injectable()
export class DeleteBookUseCase  implements IUseCase<DeleteBookCommand,void>{
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: IBookRepository,
  ) {}
  private logger=new Logger(DeleteBookUseCase.name);
  async execute(command:DeleteBookCommand):Promise<void>{
    const bookId=BookId.create(command.id);
    const exists=await this.bookRepository.exists(bookId);
    if(!exists) throw new NotFoundException('The Book not Found');
    try {
        await this.bookRepository.delete(bookId);
        this.logger.debug(`The book deleted. bookId:${bookId.value}`)
    } catch (error) {
        this.logger.error(error)

    }

  }
}
