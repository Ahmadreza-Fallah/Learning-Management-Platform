import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonFileDto {
  @ApiProperty({ example: 'course-material.pdf' })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({
    example: '/uploads/lesson-files/course-material.pdf',
  })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @ApiProperty({
    example: true,
    description: 'true = uploaded file, false = external link',
  })
  @IsBoolean()
  fileType: boolean;

  @ApiProperty({
    example: 2457600,
    description: 'File size in bytes',
  })
  @IsNumber()
  fileSize: number;

  @ApiProperty({
    example: 'pdf',
  })
  @IsString()
  fileExtension: string;
}
