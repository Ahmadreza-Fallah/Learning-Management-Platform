import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InstructorRequestsController } from './instructure-requests.controller';
import { InstructorRequestsService } from './instructure-requests.service';

@Module({
  controllers: [InstructorRequestsController],
  providers: [InstructorRequestsService, PrismaService],
})
export class InstructorRequestsModule {}
