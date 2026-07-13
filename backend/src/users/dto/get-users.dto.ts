import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsNumberString()
  page?: string = '1';

  @IsOptional()
  @IsNumberString()
  pageSize?: string = '10';

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  roleId?: string;

  @IsOptional()
  @IsString()
  sortBy?: string = 'Id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortDirection?: 'asc' | 'desc' = 'desc';
}
