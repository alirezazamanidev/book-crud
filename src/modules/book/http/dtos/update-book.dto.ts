import {
  IsString,
  IsOptional,
  IsEnum,
  MinLength,
  Min,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BookStatus } from '../../../../prisma/generated/enums';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Price must be zero or positive' })
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;
}
