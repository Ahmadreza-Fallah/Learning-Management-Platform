import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new course (Teacher only)' })
  async create(@Body() dto: CreateCourseDto, @Request() req: any) {
    return this.coursesService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  async findAll() {
    return this.coursesService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  @Get('my')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current teacher courses' })
  async getMyCourses(@CurrentUser() user: any) {
    return this.coursesService.findByTeacher(user.id);
  }
}
