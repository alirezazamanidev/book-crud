import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from '../../services/book.service';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { AuthGuard } from '../../../auth/http/guards/auth.guard';
import type { Request } from 'express';

@Controller('books')
@UseGuards(AuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBookDto,@Req() req: Request) {
    return this.bookService.create(dto,req?.['user'].id);
  }

  @Get()
  findAll(@Req() req:Request) {
    return this.bookService.findAll(req?.['user'].id);
  }
  @Get(':id')
  findOne(@Param('id') id: string,@Req() req:Request) {
    return this.bookService.findOne(id,req?.['user'].id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto, @Req() req: Request) {
    return this.bookService.update(id,req?.['user'].id, dto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    return this.bookService.delete(id,req?.['user'].id);
  }
}
