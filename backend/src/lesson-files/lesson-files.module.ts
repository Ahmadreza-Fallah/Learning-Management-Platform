import { Module } from '@nestjs/common';
import { LessonFilesController } from './lesson-files.controller';
import { LessonFilesService } from './lesson-files.service';

@Module({
  controllers: [LessonFilesController],
  providers: [LessonFilesService],
  exports: [LessonFilesService],
})
export class LessonFilesModule {}
