import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { BookStatus } from '../../../prisma/generated/enums';


export class CreateBookDto {
  @IsString()

  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  title: string;

  @IsNumber()
  @Min(0, { message: 'Price must be zero or positive' })
  @Type(() => Number)
  price: number;

  @IsString()
  isbn: string;

  @IsString()
  language: string;

  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;
}
