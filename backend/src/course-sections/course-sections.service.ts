import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class CourseSectionsService {
  constructor(private prisma: PrismaService) {}

  private async verifyCourseOwnership(courseId: number, userId: number) {
    const course = await this.prisma.courses.findUnique({
      where: { Id: courseId },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (course.Teacher_Id !== userId) {
      throw new ForbiddenException('You can only manage your own courses');
    }
    return course;
  }

  private async verifySectionOwnership(sectionId: number, userId: number) {
    const section = await this.prisma.courseSections.findUnique({
      where: { Id: sectionId },
      include: { Courses: true },
    });
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    if (section.Courses.Teacher_Id !== userId) {
      throw new ForbiddenException('You can only manage your own sections');
    }
    return section;
  }

  async create(courseId: number, userId: number, dto: CreateSectionDto) {
    await this.verifyCourseOwnership(courseId, userId);

    const maxOrder = await this.prisma.courseSections.findFirst({
      where: { Course_Id: courseId },
      orderBy: { DisplayOrder: 'desc' },
      select: { DisplayOrder: true },
    });

    const displayOrder =
      dto.displayOrder ?? ((maxOrder?.DisplayOrder ?? 0) + 1);

    return this.prisma.courseSections.create({
      data: {
        Title: dto.title,
        DisplayOrder: displayOrder,
        Course_Id: courseId,
      },
      include: {
        Lessons: true,
      },
    });
  }

  async findByCourse(courseId: number) {
    const course = await this.prisma.courses.findUnique({
      where: { Id: courseId },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.prisma.courseSections.findMany({
      where: { Course_Id: courseId },
      orderBy: { DisplayOrder: 'asc' },
      include: {
        Lessons: {
          orderBy: { SortOrder: 'asc' },
        },
      },
    });
  }

  async update(id: number, userId: number, dto: UpdateSectionDto) {
    await this.verifySectionOwnership(id, userId);

    const data: any = {};
    if (dto.title !== undefined) data.Title = dto.title;
    if (dto.displayOrder !== undefined) data.DisplayOrder = dto.displayOrder;

    return this.prisma.courseSections.update({
      where: { Id: id },
      data,
      include: {
        Lessons: true,
      },
    });
  }

  async remove(id: number, userId: number) {
    await this.verifySectionOwnership(id, userId);

    await this.prisma.courseSections.delete({ where: { Id: id } });
    return { message: 'Section deleted successfully' };
  }
}