import { Body, Controller, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { InstructorRequestsService } from './instructure-requests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateInstructorRequestDto } from './dto/create-instructor-request.dto';

@Controller('instructor-requests')
export class InstructorRequestsController {
  constructor(
    private readonly instructorRequestsService: InstructorRequestsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateInstructorRequestDto) {
    return this.instructorRequestsService.create(user.id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(3)
  @Put(':id/approve')
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.instructorRequestsService.approve(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(3)
  @Put(':id/reject')
  reject(@Param('id', ParseIntPipe) id: number) {
    return this.instructorRequestsService.reject(id);
  }
}
