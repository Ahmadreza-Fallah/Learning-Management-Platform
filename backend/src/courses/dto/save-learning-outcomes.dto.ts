import { IsArray, IsString } from 'class-validator';

export class SaveLearningOutcomesDto {
  @IsArray()
  @IsString({ each: true })
  items: string[];
}
