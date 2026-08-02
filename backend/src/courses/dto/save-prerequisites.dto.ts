import { IsArray, IsString } from 'class-validator';

export class SavePrerequisitesDto {
  @IsArray()
  @IsString({ each: true })
  items: string[];
}
