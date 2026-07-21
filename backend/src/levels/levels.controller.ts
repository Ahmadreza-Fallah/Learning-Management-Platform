import { Controller, Get } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Levels')
@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all levels' })
  async findAll() {
    return this.levelsService.findAll();
  }
}
