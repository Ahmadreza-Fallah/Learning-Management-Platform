import { Module } from '@nestjs/common';
import { CourseSectionsController } from './course-sections.controller';
import { CourseSectionsService } from './course-sections.service';

@Module({
  controllers: [CourseSectionsController],
  providers: [CourseSectionsService],
  exports: [CourseSectionsService],
})
export class CourseSectionsModule {}
