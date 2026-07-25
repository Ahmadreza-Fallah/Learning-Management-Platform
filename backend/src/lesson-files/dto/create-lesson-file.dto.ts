import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonFileDto {
  @ApiProperty({ example: 'course-material.pdf' })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({ example: 'https://example.com/files/course-material.pdf' })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;
}
