import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  MinLength,
  Min,
  MaxLength,
  IsNumberString,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  title?: string;

  @IsOptional()
  @IsNumberString()
  price?: string


  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsEnum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}
