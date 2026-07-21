import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateInstructorRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
