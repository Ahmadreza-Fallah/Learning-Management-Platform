import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    return this.prisma.carts.findMany({
      where: { User_Id: userId },
      include: {
        Courses: {
          select: {
            Id: true,
            Title: true,
            Thumbnail: true,
            Price: true,
            DiscountPrice: true,
            Slug: true,
            ShortDescription: true,
          },
        },
      },
      orderBy: { CreatedAt: 'desc' },
    });
  }

  async addToCart(userId: number, courseId: number) {
    const course = await this.prisma.courses.findUnique({
      where: { Id: courseId },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (!course.IsPublished) {
      throw new BadRequestException('Course is not available for purchase');
    }

    const existingEnrollment = await this.prisma.enrollments.findFirst({
      where: { Student_Id: userId, Course_Id: courseId },
    });
    if (existingEnrollment) {
      throw new BadRequestException('You are already enrolled in this course');
    }

    const existingCartItem = await this.prisma.carts.findUnique({
      where: {
        User_Id_Course_Id: { User_Id: userId, Course_Id: courseId },
      },
    });
    if (existingCartItem) {
      return existingCartItem;
    }

    return this.prisma.carts.create({
      data: { User_Id: userId, Course_Id: courseId },
    });
  }

  async removeFromCart(userId: number, courseId: number) {
    const item = await this.prisma.carts.findUnique({
      where: { User_Id_Course_Id: { User_Id: userId, Course_Id: courseId } },
    });
    if (!item) {
      throw new NotFoundException('Course not found in cart');
    }
    await this.prisma.carts.delete({ where: { Id: item.Id } });
    return { message: 'Course removed from cart' };
  }

  async clearCart(userId: number) {
    await this.prisma.carts.deleteMany({ where: { User_Id: userId } });
    return { message: 'Cart cleared' };
  }
}
