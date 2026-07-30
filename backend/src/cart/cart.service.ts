import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartResponseDto } from './dto/cart-item-response.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: number): Promise<CartResponseDto> {
    const items = await this.prisma.carts.findMany({
      where: { User_Id: userId },
      include: { Courses: true },
      orderBy: { CreatedAt: 'desc' },
    });

    const mapped = items.map((item) => ({
      id: item.Id,
      courseId: item.Course_Id,
      title: item.Courses.Title,
      thumbnailUrl: item.Courses.Thumbnail ?? null,
      // Prisma returns Decimal fields as a Decimal.js object, not a plain
      // number — convert before it hits JSON serialization.
      price: Number(item.Courses.DiscountPrice ?? item.Courses.Price),
      createdAt: item.CreatedAt,
    }));

    const totalPrice = mapped.reduce((sum, i) => sum + i.price, 0);

    return {
      items: mapped,
      totalItems: mapped.length,
      totalPrice,
    };
  }

  async addToCart(userId: number, courseId: number): Promise<CartResponseDto> {
    const course = await this.prisma.courses.findUnique({
      where: { Id: courseId },
    });

    if (!course || !course.IsPublished) {
      throw new NotFoundException('Course not found');
    }

    const alreadyEnrolled = await this.prisma.enrollments.findFirst({
      where: { Student_Id: userId, Course_Id: courseId },
    });

    if (alreadyEnrolled) {
      throw new BadRequestException('You are already enrolled in this course');
    }

    const existingCartItem = await this.prisma.carts.findUnique({
      where: {
        User_Id_Course_Id: {
          User_Id: userId,
          Course_Id: courseId,
        },
      },
    });

    if (existingCartItem) {
      throw new ConflictException('Course is already in your cart');
    }

    await this.prisma.carts.create({
      data: {
        User_Id: userId,
        Course_Id: courseId,
      },
    });

    return this.getCart(userId);
  }

  async removeFromCart(
    userId: number,
    courseId: number,
  ): Promise<CartResponseDto> {
    const existingCartItem = await this.prisma.carts.findUnique({
      where: {
        User_Id_Course_Id: {
          User_Id: userId,
          Course_Id: courseId,
        },
      },
    });

    if (!existingCartItem) {
      throw new NotFoundException('Course not found in cart');
    }

    await this.prisma.carts.delete({
      where: {
        User_Id_Course_Id: {
          User_Id: userId,
          Course_Id: courseId,
        },
      },
    });

    return this.getCart(userId);
  }

  async clearCart(userId: number): Promise<{ message: string }> {
    await this.prisma.carts.deleteMany({ where: { User_Id: userId } });
    return { message: 'Cart cleared successfully' };
  }
}
