import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  MinLength,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum BookStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

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
