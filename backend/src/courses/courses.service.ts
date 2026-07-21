import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async create(dto: CreateCourseDto, userId: number) {
    let slug = this.generateSlug(dto.title);
    const existing = await this.prisma.courses.findUnique({
      where: { Slug: slug },
    });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    return this.prisma.courses.create({
      data: {
        Title: dto.title,
        ShortDescription: dto.shortDescription || null,
        Description: dto.description || null,
        Price: dto.price,
        DiscountPrice: dto.discountPrice || null,
        CategoryId: dto.categoryId,
        Level_Id: dto.levelId || null,
        DurationMinutes: dto.durationMinutes || null,
        Thumbnail: dto.thumbnail || null,
        Teacher_Id: userId,
        Slug: slug,
        IsPublished: false,
        AverageRating: 0,
      },
      include: {
        Category: true,
        Level: true,
      },
    });
  }

  async findAll() {
    return this.prisma.courses.findMany({
      include: {
        Category: true,
        Level: true,
        Users: {
          select: {
            Id: true,
            FirstName: true,
            LastName: true,
          },
        },
      },
    });
  }

  async findByTeacher(teacherId: number) {
    return this.prisma.courses.findMany({
      where: {
        Teacher_Id: teacherId,
      },
      orderBy: {
        CreatedAt: 'desc',
      },
      select: {
        Id: true,
        Title: true,
        Thumbnail: true,
        Price: true,
        DiscountPrice: true,
        IsPublished: true,
        CreatedAt: true,
        AverageRating: true,

        Category: {
          select: {
            Id: true,
            Title: true,
          },
        },

        Level: {
          select: {
            Id: true,
            LevelName: true,
          },
        },
      },
    });
  }
}
