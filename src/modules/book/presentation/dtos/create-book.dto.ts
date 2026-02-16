import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  MinLength,
  Min,
  MaxLength,
  IsDateString,
  IsInt,
  Max,
  IsNumberString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  title: string;


  @IsNumberString()
  price: string

  @IsString()
  isbn: string;
 

  @IsString()
  language: string;


  @IsOptional()
  @IsEnum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}
