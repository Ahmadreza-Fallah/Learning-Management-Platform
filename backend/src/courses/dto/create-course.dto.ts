import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Complete React Developer Course' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Learn React from scratch' })
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiPropertyOptional({ example: 'A comprehensive course about React...' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 49.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 39.99 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  discountPrice?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  levelId?: number;

  @ApiPropertyOptional({ example: 120 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  durationMinutes?: number;

  @ApiPropertyOptional({ example: 'https://example.com/thumbnail.jpg' })
  @IsString()
  @IsOptional()
  thumbnail?: string;
}
